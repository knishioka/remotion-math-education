# 🧮 Remotion Math Education Video Generator

Remotionを使用した高品質な筆算教育動画生成システム

## ✨ 特徴

- **4K対応**: 3840x2160の超高解像度動画
- **プロ品質**: 60fps、h264コーデック、CRF18の高品質設定
- **React製**: TypeScriptとReactを使用したモダンな開発環境
- **カスタマイズ可能**: 任意の数字で問題を生成
- **段階的アニメーション**: 筆算の各ステップを視覚的に表現
- **音声ナレーション対応**: 教育的な音声ガイド付き

## 🚀 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（Remotion Studio）
npm run dev

# 動画をレンダリング
npm run render

# 特定の問題でレンダリング
npx remotion render src/index.ts math-education-video out/custom-video.mp4 --props='{"number1": 47, "number2": 28, "title": "カスタム問題"}'
```

## 📁 プロジェクト構造

```
src/
├── components/          # UIコンポーネント
│   ├── Title.tsx           # タイトル画面
│   ├── Calculation.tsx     # 筆算表示
│   ├── CompletionEffect.tsx # 完了エフェクト
│   └── VoiceNarration.tsx  # 音声ナレーション
├── compositions/        # 動画構成
│   └── MathEducationVideo.tsx
├── utils/              # ユーティリティ
│   ├── mathProblem.ts     # 数学問題生成
│   └── animations.ts      # アニメーション設定
├── Root.tsx            # ルートコンポーネント
└── index.ts           # エントリーポイント
```

## 🎬 動画構成

### タイムライン
1. **タイトル画面** (0-4秒): 問題紹介とアニメーション
2. **計算過程** (4-35秒): 段階的な筆算アニメーション
3. **結果確認** (35-40秒): 答えを確認する時間
4. **完了画面** (40秒以降): 励ましメッセージとエフェクト

### 品質設定
- **解像度**: 1920x1080 (標準) / 3840x2160 (4K)
- **フレームレート**: 30fps (標準) / 60fps (4K)
- **コーデック**: H.264
- **品質**: CRF18 (高品質)

## 🎨 カスタマイズ

### 問題の変更
```typescript
// Root.tsxで設定を変更
defaultProps={{
  number1: 27,    // 第1項
  number2: 35,    // 第2項
  title: "楽しい筆算学習",
}}
```

### 色設定
```typescript
// utils/animations.ts
COLORS: {
  primary: '#2563eb',     // 青
  secondary: '#059669',   // 緑
  accent: '#7c3aed',      // 紫
  warning: '#ea580c',     // オレンジ
  highlight: '#fbbf24',   // 黄色
}
```

### アニメーション調整
```typescript
// utils/animations.ts
ANIMATION_CONFIG: {
  INTRO_DURATION: 90,      // タイトル時間
  STEP_DURATION: 120,      // ステップ時間
  TRANSITION_DURATION: 30, // 遷移時間
}
```

## 🔊 音声ナレーション

音声ファイルを `public/narration/` に配置：
- `intro.mp3` - 導入部
- `step0.mp3` - 1の位の計算
- `step1.mp3` - 10の位の計算
- `completion.mp3` - 完了メッセージ

## 📊 使用例

### 基本的な問題
```bash
npx remotion render src/index.ts math-education-video out/basic.mp4 \
  --props='{"number1": 23, "number2": 16, "title": "基本の足し算"}'
```

### 繰り上がりありの問題
```bash
npx remotion render src/index.ts math-education-video out/carry.mp4 \
  --props='{"number1": 47, "number2": 38, "title": "繰り上がりの練習"}'
```

### 4K高品質版
```bash
npx remotion render src/index.ts math-education-video-4k out/4k-video.mp4 \
  --props='{"number1": 156, "number2": 278, "title": "3桁の計算"}'
```

## 🛠️ 開発

### ライブプレビュー
```bash
npm run dev
# http://localhost:3005 でRemotionStudioが開きます
```

### カスタムコンポーネント追加
1. `src/components/` に新しいコンポーネントを作成
2. `MathEducationVideo.tsx` にインポート
3. タイムラインに組み込み

### アニメーション追加
1. `utils/animations.ts` に新しいアニメーション関数を追加
2. コンポーネントでインポートして使用

## 🎯 教育効果

- **視覚的学習**: 段階的なアニメーションで理解促進
- **反復学習**: 任意の問題で動画生成可能
- **集中力向上**: 美しいアニメーションで注意喚起
- **自主学習**: 音声ガイド付きで自習可能

## 📈 パフォーマンス

- **レンダリング時間**: 約1-3分（設定による）
- **ファイルサイズ**: 10-50MB（品質・長さによる）
- **メモリ使用量**: 1-2GB（開発時）

## 🔧 トラブルシューティング

### よくある問題

1. **音声が再生されない**
   - `public/narration/` に音声ファイルがあるか確認
   - ファイル形式がMP3/WAVか確認

2. **アニメーションがガクガクする**
   - フレームレートを30fpsに下げる
   - アニメーション設定を軽量化

3. **レンダリングが遅い**
   - 解像度を1080pに下げる
   - CRF値を上げる（品質を下げる）

## 📁 バッチ生成

複数の動画を一括生成するためのスクリプトも用意されています：

```bash
# バッチスクリプトを実行
./generate-batch.sh
```

これにより初級・中級・上級の問題セットが `out/batch/` に生成されます。

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。