import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MathProblem } from '../utils/mathProblem';
import { ANIMATION_CONFIG, bounceIn, highlight, carryAnimation } from '../utils/animations';

interface CalculationProps {
  problem: MathProblem;
  currentStep: number;
  startFrame: number;
  showResultConfirmation?: boolean;
}

export const Calculation: React.FC<CalculationProps> = ({ 
  problem, 
  currentStep, 
  startFrame,
  showResultConfirmation = false
}) => {
  const frame = useCurrentFrame();
  const { num1, num2, steps } = problem;
  
  // 数字の文字列変換と桁数計算
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const maxDigits = Math.max(num1Str.length, num2Str.length);
  
  // レイアウト設定（大きい文字用に調整）
  const digitWidth = 200;  // より広い間隔
  const rowHeight = 220;   // より高い行間
  const centerX = 960;     // 1920 / 2
  const startY = 350;      // 少し上に配置
  const digitSpacing = digitWidth;
  const startX = centerX - ((maxDigits - 1) * digitSpacing) / 2;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: ANIMATION_CONFIG.COLORS.background,
        fontFamily: ANIMATION_CONFIG.FONTS.monospace,
      }}
    >
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute' }}
      >
        {/* 上の数字 (第1項) */}
        {num1Str.split('').map((digit, i) => {
          const x = startX + i * digitSpacing;
          const y = startY;
          const digitFrame = startFrame + 20 + i * 5;
          
          const shouldHighlight = currentStep >= 0 && 
            steps[currentStep] && 
            steps[currentStep].position === (maxDigits - 1 - i);
          
          return (
            <text
              key={`num1-${i}`}
              x={x}
              y={y}
              fontSize={ANIMATION_CONFIG.SIZES.numberFontSize}
              fontWeight="bold"
              fill={ANIMATION_CONFIG.COLORS.primary}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                ...bounceIn(frame, 30, digitFrame),
                ...(shouldHighlight ? highlight(frame, startFrame + currentStep * ANIMATION_CONFIG.STEP_DURATION, 120) : {})
              }}
            >
              {digit}
            </text>
          );
        })}
        
        {/* プラス記号 */}
        <text
          x={startX - digitSpacing * 0.8}
          y={startY + rowHeight}
          fontSize={ANIMATION_CONFIG.SIZES.numberFontSize}
          fontWeight="bold"
          fill={ANIMATION_CONFIG.COLORS.text}
          textAnchor="middle"
          dominantBaseline="middle"
          style={bounceIn(frame, 30, startFrame + 40)}
        >
          +
        </text>
        
        {/* 下の数字 (第2項) */}
        {num2Str.split('').map((digit, i) => {
          const x = startX + (maxDigits - num2Str.length + i) * digitSpacing;
          const y = startY + rowHeight;
          const digitFrame = startFrame + 60 + i * 5;
          
          const shouldHighlight = currentStep >= 0 && 
            steps[currentStep] && 
            steps[currentStep].position === (maxDigits - 1 - (maxDigits - num2Str.length + i));
          
          return (
            <text
              key={`num2-${i}`}
              x={x}
              y={y}
              fontSize={ANIMATION_CONFIG.SIZES.numberFontSize}
              fontWeight="bold"
              fill={ANIMATION_CONFIG.COLORS.secondary}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                ...bounceIn(frame, 30, digitFrame),
                ...(shouldHighlight ? highlight(frame, startFrame + currentStep * ANIMATION_CONFIG.STEP_DURATION, 120) : {})
              }}
            >
              {digit}
            </text>
          );
        })}
        
        {/* 横線 */}
        <line
          x1={startX - digitSpacing * 0.6}
          y1={startY + rowHeight * 1.5}
          x2={startX + maxDigits * digitSpacing - digitSpacing * 0.4}
          y2={startY + rowHeight * 1.5}
          stroke={ANIMATION_CONFIG.COLORS.text}
          strokeWidth="4"
          style={bounceIn(frame, 30, startFrame + 90)}
        />
        
        {/* 結果の数字 */}
        {steps.map((step, stepIndex) => {
          if (stepIndex > currentStep) return null;
          
          const digitIndex = step.position === maxDigits ? -1 : maxDigits - 1 - step.position;
          const x = step.position === maxDigits ? 
            startX - digitSpacing : // 最終繰り上がり
            startX + digitIndex * digitSpacing;
          const y = startY + rowHeight * 2;
          const resultFrame = startFrame + ANIMATION_CONFIG.STEP_DURATION + stepIndex * ANIMATION_CONFIG.STEP_DURATION + 60;
          
          return (
            <text
              key={`result-${stepIndex}`}
              x={x}
              y={y}
              fontSize={ANIMATION_CONFIG.SIZES.numberFontSize}
              fontWeight="bold"
              fill={ANIMATION_CONFIG.COLORS.accent}
              textAnchor="middle"
              dominantBaseline="middle"
              style={bounceIn(frame, 30, resultFrame)}
            >
              {step.resultDigit}
            </text>
          );
        })}
        
        {/* 繰り上がりの数字 */}
        {steps.map((step, stepIndex) => {
          if (stepIndex > currentStep || step.newCarry === 0 || stepIndex === steps.length - 1) return null;
          
          const digitIndex = maxDigits - 2 - step.position;
          const fromX = startX + (maxDigits - 1 - step.position) * digitSpacing;
          const fromY = startY + rowHeight * 2;
          const toX = startX + digitIndex * digitSpacing;
          const toY = startY - 80;
          const carryFrame = startFrame + ANIMATION_CONFIG.STEP_DURATION + stepIndex * ANIMATION_CONFIG.STEP_DURATION + 90;
          
          return (
            <g key={`carry-${stepIndex}`}>
              {/* 移動する繰り上がり */}
              {frame >= carryFrame && frame < carryFrame + 90 && (
                <text
                  fontSize={ANIMATION_CONFIG.SIZES.carryFontSize}
                  fontWeight="bold"
                  fill={ANIMATION_CONFIG.COLORS.warning}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={carryAnimation(frame, carryFrame, fromX, fromY, toX, toY, 90)}
                >
                  {step.newCarry}
                </text>
              )}
              
              {/* 固定された繰り上がり */}
              {frame >= carryFrame + 90 && (
                <text
                  x={toX}
                  y={toY}
                  fontSize={ANIMATION_CONFIG.SIZES.carryFontSize}
                  fontWeight="bold"
                  fill={ANIMATION_CONFIG.COLORS.warning}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ opacity: 0.8 }}
                >
                  {step.newCarry}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* 問題表示 */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: ANIMATION_CONFIG.SIZES.explanationFontSize,
          fontWeight: 'bold',
          color: ANIMATION_CONFIG.COLORS.text,
          fontFamily: ANIMATION_CONFIG.FONTS.japanese,
          textAlign: 'center',
          opacity: frame >= startFrame ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {problem.displayText}
      </div>
      
      {/* ステップの説明 */}
      {currentStep >= 0 && currentStep < steps.length && !showResultConfirmation && (
        <div
          style={{
            position: 'absolute',
            bottom: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: ANIMATION_CONFIG.SIZES.smallFontSize,
            color: ANIMATION_CONFIG.COLORS.text,
            fontFamily: ANIMATION_CONFIG.FONTS.japanese,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px 40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            lineHeight: 1.6,
          }}
        >
          {steps[currentStep].explanation}
        </div>
      )}
      
      {/* 結果確認メッセージ */}
      {showResultConfirmation && (
        <div
          style={{
            position: 'absolute',
            bottom: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: ANIMATION_CONFIG.SIZES.explanationFontSize,
            fontWeight: 'bold',
            color: ANIMATION_CONFIG.COLORS.accent,
            fontFamily: ANIMATION_CONFIG.FONTS.japanese,
            textAlign: 'center',
            background: 'rgba(124, 58, 237, 0.1)',
            padding: '30px 50px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
            border: `3px solid ${ANIMATION_CONFIG.COLORS.accent}`,
            animation: 'pulse 2s infinite',
          }}
        >
          答え：{problem.answer} ✨<br />
          <span style={{ fontSize: ANIMATION_CONFIG.SIZES.smallFontSize, fontWeight: 'normal' }}>
            計算できましたね！
          </span>
        </div>
      )}
    </div>
  );
};