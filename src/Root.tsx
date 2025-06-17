import React from 'react';
import { Composition } from 'remotion';
import { MathEducationVideo } from './compositions/MathEducationVideo';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="math-education-video"
        component={MathEducationVideo}
        durationInFrames={1200} // 40秒 (30fps) - 結果確認時間を追加
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          number1: 27,
          number2: 35,
          title: "楽しい筆算学習",
        }}
      />
      <Composition
        id="math-education-video-4k"
        component={MathEducationVideo}
        durationInFrames={2400} // 40秒 (60fps) - 結果確認時間を追加
        fps={60}
        width={3840}
        height={2160}
        defaultProps={{
          number1: 47,
          number2: 28,
          title: "楽しい筆算学習 4K",
        }}
      />
    </>
  );
};