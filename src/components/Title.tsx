import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { ANIMATION_CONFIG } from '../utils/animations';

interface TitleProps {
  title: string;
  subtitle?: string;
}

export const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 200,
      mass: 1,
    },
  });
  
  const subtitleSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 15,
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
        background: `linear-gradient(135deg, ${ANIMATION_CONFIG.COLORS.primary} 0%, ${ANIMATION_CONFIG.COLORS.accent} 100%)`,
        color: ANIMATION_CONFIG.COLORS.white,
        fontFamily: ANIMATION_CONFIG.FONTS.japanese,
      }}
    >
      {/* 背景装飾 */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: `scale(${titleSpring}) rotate(${frame * 0.5}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          transform: `scale(${titleSpring}) rotate(${-frame * 0.3}deg)`,
        }}
      />
      
      {/* メインタイトル */}
      <h1
        style={{
          fontSize: ANIMATION_CONFIG.SIZES.titleFontSize,
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 0,
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
          transform: `translateY(${(1 - titleSpring) * 50}px)`,
          opacity: titleSpring,
        }}
      >
        {title}
      </h1>
      
      {/* サブタイトル */}
      {subtitle && (
        <p
          style={{
            fontSize: ANIMATION_CONFIG.SIZES.explanationFontSize,
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px 0 0 0',
            opacity: 0.9,
            transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
            opacity: subtitleSpring * 0.9,
          }}
        >
          {subtitle}
        </p>
      )}
      
      {/* キラキラエフェクト */}
      {[...Array(8)].map((_, i) => {
        const delay = i * 5;
        const sparkleSpring = spring({
          frame: frame - delay,
          fps,
          config: {
            damping: 10,
            stiffness: 100,
            mass: 1,
          },
        });
        
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 300;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: '12px',
              height: '12px',
              background: ANIMATION_CONFIG.COLORS.highlight,
              borderRadius: '50%',
              transform: `scale(${sparkleSpring})`,
              opacity: sparkleSpring,
              boxShadow: `0 0 20px ${ANIMATION_CONFIG.COLORS.highlight}`,
            }}
          />
        );
      })}
    </div>
  );
};