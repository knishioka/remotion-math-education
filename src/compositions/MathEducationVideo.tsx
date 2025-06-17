import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Title } from '../components/Title';
import { Calculation } from '../components/Calculation';
import { CompletionEffect } from '../components/CompletionEffect';
import { createMathProblem } from '../utils/mathProblem';
import { ANIMATION_CONFIG } from '../utils/animations';

interface MathEducationVideoProps {
  number1: number;
  number2: number;
  title: string;
}

export const MathEducationVideo: React.FC<MathEducationVideoProps> = ({ 
  number1, 
  number2, 
  title 
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  // 数学問題を生成
  const problem = createMathProblem(number1, number2);
  
  // タイムライン設定
  const titleDuration = ANIMATION_CONFIG.INTRO_DURATION;
  const calculationStart = titleDuration;
  const stepDuration = ANIMATION_CONFIG.STEP_DURATION;
  const totalCalculationDuration = problem.steps.length * stepDuration;
  const resultConfirmationDuration = 150; // 5秒間結果を確認する時間
  const completionStart = calculationStart + totalCalculationDuration + resultConfirmationDuration;
  const completionDuration = ANIMATION_CONFIG.OUTRO_DURATION;
  
  // 現在のステップを計算
  const calculateCurrentStep = () => {
    if (frame < calculationStart) return -1;
    if (frame >= completionStart) return problem.steps.length;
    
    const calculationFrame = frame - calculationStart;
    return Math.floor(calculationFrame / stepDuration);
  };
  
  const currentStep = calculateCurrentStep();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* タイトル画面 */}
      {frame < titleDuration && (
        <Title 
          title={title}
          subtitle={`${problem.displayText} を一緒に計算しよう！`}
        />
      )}
      
      {/* 計算画面 */}
      {frame >= calculationStart && frame < completionStart && (
        <Calculation
          problem={problem}
          currentStep={currentStep}
          startFrame={calculationStart}
          showResultConfirmation={frame >= calculationStart + totalCalculationDuration}
        />
      )}
      
      {/* 完了画面 */}
      {frame >= completionStart && (
        <CompletionEffect
          problem={problem}
          startFrame={completionStart}
        />
      )}
      
      {/* デバッグ情報（開発時のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'monospace',
            fontSize: '12px',
            zIndex: 1000,
          }}
        >
          <div>Frame: {frame}/{durationInFrames}</div>
          <div>Step: {currentStep}/{problem.steps.length}</div>
          <div>Problem: {problem.num1} + {problem.num2} = {problem.answer}</div>
          <div>Has Carry: {problem.hasCarry ? 'Yes' : 'No'}</div>
          <div>Phase: {
            frame < titleDuration ? 'Title' :
            frame < completionStart ? 'Calculation' :
            'Completion'
          }</div>
        </div>
      )}
    </div>
  );
};