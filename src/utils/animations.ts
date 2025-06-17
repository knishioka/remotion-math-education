import { interpolate, spring } from 'remotion';

// イージング関数
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// アニメーション設定
export const ANIMATION_CONFIG = {
  // 基本タイミング（生徒が理解しやすいようにゆっくりに）
  INTRO_DURATION: 120,      // 4秒（タイトル表示を長く）
  STEP_DURATION: 180,       // 6秒（各ステップをじっくり見せる）
  TRANSITION_DURATION: 45,  // 1.5秒（穏やかな切り替え）
  OUTRO_DURATION: 150,      // 5秒（答えの確認時間を長く）
  
  // Spring設定（激しい動きを抑える）
  SPRING_CONFIG: {
    damping: 30,        // より穏やかな動き
    stiffness: 100,     // 弾力を抑える
    mass: 1.5,          // 重さを増やして安定させる
  },
  
  // 色設定
  COLORS: {
    primary: '#2563eb',     // 青
    secondary: '#059669',   // 緑
    accent: '#7c3aed',      // 紫
    warning: '#ea580c',     // オレンジ
    highlight: '#fbbf24',   // 黄色
    text: '#1f2937',        // ダークグレー
    background: '#f8fafc',  // ライトグレー
    white: '#ffffff',
  },
  
  // フォント設定
  FONTS: {
    primary: 'Inter, system-ui, sans-serif',
    monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    japanese: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  },
  
  // サイズ設定（生徒が見やすいように大きく）
  SIZES: {
    titleFontSize: 120,        // タイトルを大きく
    numberFontSize: 180,       // 数字をかなり大きく
    explanationFontSize: 72,   // 説明文も大きく
    smallFontSize: 48,         // 小さい文字も見やすく
    carryFontSize: 96,         // 繰り上がりの数字
  }
};

// 数字のスライドイン（ゆっくりと穏やかに）
export const slideInFromRight = (frame: number, startFrame: number, duration: number = 60) => {
  const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
  return {
    transform: `translateX(${interpolate(progress, [0, 1], [50, 0], {
      easing: easeOutCubic
    })}px)`,
    opacity: interpolate(progress, [0, 1], [0, 1]),
  };
};

// 数字のバウンス
export const bounceIn = (frame: number, fps: number, startFrame: number) => {
  const springValue = spring({
    frame: frame - startFrame,
    fps,
    config: ANIMATION_CONFIG.SPRING_CONFIG,
  });
  
  return {
    transform: `scale(${springValue})`,
    opacity: springValue > 0 ? 1 : 0,
  };
};

// ハイライト効果（穏やかな強調）
export const highlight = (frame: number, startFrame: number, duration: number = 120) => {
  const progress = (frame - startFrame) / duration;
  const pulseProgress = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5; // より遅いパルス
  
  return {
    backgroundColor: `rgba(251, 191, 36, ${pulseProgress * 0.2})`, // より薄い色
    transform: `scale(${1 + pulseProgress * 0.05})`, // より小さい拡大
    borderRadius: '12px',
    padding: '12px',
  };
};

// 繰り上がりのアニメーション（ゆっくりとした動き）
export const carryAnimation = (
  frame: number, 
  startFrame: number, 
  fromX: number, 
  fromY: number, 
  toX: number, 
  toY: number,
  duration: number = 90  // より長い時間
) => {
  const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
  const easedProgress = easeInOutCubic(progress);
  
  const currentX = interpolate(easedProgress, [0, 1], [fromX, toX]);
  const currentY = interpolate(easedProgress, [0, 1], [fromY, toY]);
  
  // より低いパラボラ軌道
  const arc = Math.sin(progress * Math.PI) * 30;
  
  return {
    transform: `translate(${currentX}px, ${currentY - arc}px)`,
    opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]),
    color: ANIMATION_CONFIG.COLORS.warning,
  };
};

// テキストのタイプライター効果
export const typewriter = (frame: number, startFrame: number, text: string, speed: number = 2) => {
  const progress = Math.max(0, (frame - startFrame) / speed);
  const visibleLength = Math.floor(progress);
  
  return text.substring(0, Math.min(visibleLength, text.length));
};

// フェードイン・アウト
export const fadeInOut = (
  frame: number, 
  startFrame: number, 
  duration: number, 
  fadeInDuration: number = 15, 
  fadeOutDuration: number = 15
) => {
  const localFrame = frame - startFrame;
  
  if (localFrame < 0) return { opacity: 0 };
  if (localFrame < fadeInDuration) {
    return { opacity: localFrame / fadeInDuration };
  }
  if (localFrame > duration - fadeOutDuration) {
    return { opacity: (duration - localFrame) / fadeOutDuration };
  }
  return { opacity: 1 };
};

// パーティクル効果用の位置計算
export const getParticlePosition = (
  frame: number, 
  startFrame: number, 
  particleIndex: number, 
  centerX: number, 
  centerY: number
) => {
  const localFrame = frame - startFrame;
  const angle = (particleIndex * 360 / 12) * (Math.PI / 180);
  const distance = localFrame * 3;
  const gravity = localFrame * localFrame * 0.1;
  
  return {
    x: centerX + Math.cos(angle) * distance,
    y: centerY + Math.sin(angle) * distance + gravity,
    opacity: Math.max(0, 1 - localFrame / 60),
    scale: Math.max(0.1, 1 - localFrame / 90),
  };
};