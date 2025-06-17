import React from 'react';
import { useCurrentFrame, Audio, staticFile } from 'remotion';

interface VoiceNarrationProps {
  step: number;
  startFrame: number;
  duration: number;
}

export const VoiceNarration: React.FC<VoiceNarrationProps> = ({ 
  step, 
  startFrame, 
  duration 
}) => {
  const frame = useCurrentFrame();
  
  // ナレーション音声のマッピング
  const narrationFiles = {
    intro: 'narration/intro.mp3',
    step0: 'narration/step0.mp3',
    step1: 'narration/step1.mp3',
    step2: 'narration/step2.mp3',
    completion: 'narration/completion.mp3',
  };
  
  const getNarrationFile = (stepNumber: number): string | null => {
    switch (stepNumber) {
      case -1: return narrationFiles.intro;
      case 0: return narrationFiles.step0;
      case 1: return narrationFiles.step1;
      case 2: return narrationFiles.step2;
      default: 
        if (stepNumber >= 3) return narrationFiles.completion;
        return null;
    }
  };
  
  const narrationFile = getNarrationFile(step);
  
  if (!narrationFile || frame < startFrame || frame >= startFrame + duration) {
    return null;
  }

  return (
    <Audio
      src={staticFile(narrationFile)}
      startFrom={0}
      endAt={duration}
    />
  );
};