import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { ANIMATION_CONFIG, getParticlePosition } from '../utils/animations';
import { MathProblem } from '../utils/mathProblem';

interface CompletionEffectProps {
  problem: MathProblem;
  startFrame: number;
}

export const CompletionEffect: React.FC<CompletionEffectProps> = ({ 
  problem, 
  startFrame 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const completionSpring = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 200,
      mass: 1,
    },
  });
  
  const textSpring = spring({
    frame: frame - startFrame - 20,
    fps,
    config: {
      damping: 20,
      stiffness: 150,
      mass: 1,
    },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${ANIMATION_CONFIG.COLORS.secondary} 0%, ${ANIMATION_CONFIG.COLORS.primary} 100%)`,
        color: ANIMATION_CONFIG.COLORS.white,
        fontFamily: ANIMATION_CONFIG.FONTS.japanese,
      }}
    >
      {/* パーティクルエフェクト */}
      {[...Array(20)].map((_, i) => {
        const particle = getParticlePosition(frame, startFrame, i, 960, 540);
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: i % 3 === 0 ? ANIMATION_CONFIG.COLORS.highlight : 
                         i % 3 === 1 ? ANIMATION_CONFIG.COLORS.warning : 
                         ANIMATION_CONFIG.COLORS.white,
              opacity: particle.opacity,
              transform: `scale(${particle.scale})`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            }}
          />
        );
      })}
      
      {/* 完了メッセージ */}
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${completionSpring}) translateY(${(1 - completionSpring) * 50}px)`,
          opacity: completionSpring,
        }}
      >
        <h1
          style={{
            fontSize: ANIMATION_CONFIG.SIZES.titleFontSize,
            fontWeight: 'bold',
            margin: 0,
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          🎉 完成！ 🎉
        </h1>
        
        <p
          style={{
            fontSize: ANIMATION_CONFIG.SIZES.explanationFontSize,
            fontWeight: 'normal',
            margin: '30px 0',
            opacity: 0.95,
          }}
        >
          よくできました！
        </p>
      </div>
      
      {/* 結果表示 */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '40px 60px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          transform: `scale(${textSpring}) translateY(${(1 - textSpring) * 30}px)`,
          opacity: textSpring,
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: ANIMATION_CONFIG.SIZES.numberFontSize,
            fontWeight: 'bold',
            fontFamily: ANIMATION_CONFIG.FONTS.monospace,
            marginBottom: '20px',
          }}
        >
          {problem.num1} + {problem.num2} = {problem.answer}
        </div>
        
        <div
          style={{
            fontSize: ANIMATION_CONFIG.SIZES.smallFontSize,
            opacity: 0.9,
          }}
        >
          {problem.hasCarry ? '繰り上がりのある計算も正しくできました！' : '基本の計算がとても上手にできました！'}
        </div>
      </div>
      
      {/* 励ましメッセージ */}
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          fontSize: ANIMATION_CONFIG.SIZES.smallFontSize,
          opacity: textSpring * 0.8,
          textAlign: 'center',
        }}
      >
        ⭐ 筆算がどんどん得意になっていますね！ ⭐
      </div>
      
      {/* 回転する装飾要素 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: `rotate(${frame * 2}deg) scale(${completionSpring})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          transform: `rotate(${-frame * 1.5}deg) scale(${completionSpring})`,
        }}
      />
    </div>
  );
};