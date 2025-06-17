#!/bin/bash

# 初級レベルの動画を生成
echo "初級レベルの動画を生成中..."
npx remotion render math-education-video-4k out/batch/beginner-1.mp4 --props='{"number1": 23, "number2": 16, "title": "はじめての筆算"}'
npx remotion render math-education-video-4k out/batch/beginner-2.mp4 --props='{"number1": 31, "number2": 12, "title": "1の位から順番に"}'
npx remotion render math-education-video-4k out/batch/beginner-3.mp4 --props='{"number1": 42, "number2": 25, "title": "2桁の足し算"}'
npx remotion render math-education-video-4k out/batch/beginner-4.mp4 --props='{"number1": 51, "number2": 34, "title": "慣れてきた筆算"}'

# 中級レベルの動画を生成
echo "中級レベルの動画を生成中..."
npx remotion render math-education-video-4k out/batch/intermediate-1.mp4 --props='{"number1": 27, "number2": 35, "title": "はじめての繰り上がり"}'
npx remotion render math-education-video-4k out/batch/intermediate-2.mp4 --props='{"number1": 48, "number2": 37, "title": "繰り上がりをマスター"}'
npx remotion render math-education-video-4k out/batch/intermediate-3.mp4 --props='{"number1": 59, "number2": 28, "title": "10の位も繰り上がり"}'
npx remotion render math-education-video-4k out/batch/intermediate-4.mp4 --props='{"number1": 76, "number2": 89, "title": "難しい繰り上がり"}'

echo "すべての動画生成が完了しました！"