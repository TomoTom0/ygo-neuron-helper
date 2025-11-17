# 作業中のタスク

## v0.4.0: デッキ編集UI改善とメタデータ編集機能（2025-11-18）

### ドラッグ&ドロップUIの改善

#### 実装内容
- [x] セクションドロップハンドラーの追加（DeckSection.vue）
  - `@drop="handleEndDrop"` を追加してセクション末尾へのドロップを処理
- [x] 背景枠線の位置ずれ修正
  - `border: 2px dashed` → `outline: 2px dashed` + `outline-offset: -2px`
  - レイアウトシフトを防止
- [x] アニメーション中のz-index修正
  - 移動中のカードに `z-index: 1000` を適用
  - アニメーション完了後にリセット
- [x] 同じセクション内の並び替えロジック修正
  - aをbにドロップ時の挙動を修正：
    - aが前 → b, a の順（aをbの後ろに挿入）
    - aが後ろ → a, b の順（aをbの前に挿入）
- [x] ビルド・デプロイ
- [x] ボタン押下時の移動アニメーション修正
  - `shuffleSection` と `sortSection` にFLIPアニメーションを追加
  - `recordAllCardPositionsByUUID()` でFirst位置を記録
  - `animateCardMoveByUUID()` でアニメーション実行
- [x] ビルド・デプロイ（アニメーション対応）
- [x] アニメーション不具合の修正
  - `reorderCard` にrequestAnimationFrame追加（タイミング修正）
  - 画像の`key`属性をUUIDベースに変更（fadeInアニメーション防止）
- [x] ビルド・デプロイ（不具合修正）
- [x] アニメーション不具合の根本原因修正
  - `moveCard`と`moveCardWithPosition`で移動元セクションを追加
  - `new Set([to])` → `new Set([from, to])`
  - 移動元のカードが詰まるアニメーションを表示
- [x] ビルド・デプロイ（根本修正）
- [ ] 動作確認（並び替え・移動・画像の白化含む）

#### 完了条件
- [x] セクション背景色とドロップ成功が一致
- [x] 背景枠線による位置ずれなし
- [x] アニメーション中のカードが最前面表示
- [x] 同じセクション内の並び替えが正しく動作
- [x] ボタン押下時（Shuffle/Sort）のアニメーション動作
- [x] 画像のfadeInアニメーション防止（UUID key使用）

---

### ⚠️ 緊急修正: displayOrder/deckInfo設計修正（完了）

#### 概要
displayOrderとdeckInfoの二重管理による設計不備を修正。
「displayOrder操作関数が常にdeckInfoも同時更新する」という原則を徹底。

#### 実装計画
- [x] `insertToDisplayOrder(card, section, targetUuid)`関数を新規作成
- [x] `reorderWithinSection(section, sourceUuid, targetUuid)`関数を新規作成
- [x] `moveCardWithPosition`を修正
- [x] `insertCard`を削除
- [x] DeckSection.vueの直接操作を削除
- [x] ビルド・デプロイ
- [x] CLAUDE.md/ドキュメントの陳腐化情報を調査・修正

---

### 概要
デッキ編集UIを改善し、以下の機能を実装：

1. **オプション設定のテーマ変更**
   - デフォルトテーマをライトテーマに変更（現在darkテーマが実質機能していないため）

2. **デッキメタデータ編集機能**
   - right-areaのheader tabをmetadata tabに変更
   - デッキ名、公開設定などのメタデータを編集可能に

### 実装計画

#### Phase 1: オプション設定のテーマ変更
- [x] デフォルトテーマをライトテーマに設定
- [x] 設定ファイル修正（`src/types/settings.ts`: DEFAULT_APP_SETTINGS.theme = 'light'）
- [x] ビルド・デプロイ

#### Phase 2: メタデータ編集機能の調査と実装
- [x] right-areaのheader tabの調査
- [x] header tab → metadata tab に名前変更（`src/components/RightArea.vue`）
- [x] メタデータ編集UIの設計
  - デッキ名、公開設定、タグなどの編集フォーム
  - `src/components/DeckMetadata.vue`を作成
- [x] メタデータ保存機能の実装
  - APIエンドポイント調査（既存の`saveDeck`を利用）
  - 保存ロジック実装
- [x] ビルド・デプロイ

#### Phase 3: メタデータUIの詳細改善
- [x] デッキ名フィールドを削除（ヘッダーに属するため）
- [x] カテゴリ選択UIを追加（検索・ドロップダウン・チップ表示）
- [x] タグ選択UIを追加（プリセットベース、カテゴリと同様のUI）
- [x] select要素のoption要素にスタイルを明示的に設定
- [x] todo.mdにタグマスターデータ取得タスクを追加
- [x] ビルド・デプロイ

### 完了条件
- [x] デフォルトテーマがライトテーマに設定されている
- [x] メタデータタブが表示され、編集可能
- [x] カテゴリ・タグ選択UIが実装されている
- [x] 全てのドロップダウン要素に明示的なスタイルが適用されている
- [x] ビルド・デプロイ完了

---

## v0.3.9: PNG画像へのデッキ情報埋め込み機能（2025-11-17）

### 概要
デッキ画像（PNG）にデッキ情報（section, cid, ciid, quantity）を埋め込み、
画像からデッキをインポートできる機能を追加する。

### 技術方式
- **PNGメタデータ（tEXtチャンク）方式** を採用
- ブラウザ環境でバイナリ操作を行い、PNGのIENDチャンク前にtEXtチャンクを挿入
- 画像の見た目に影響しない標準的な方法

### 実装計画

#### 1. PNG埋め込み用ユーティリティ (`src/utils/png-metadata.ts`)
- [ ] `embedDeckInfoToPNG(pngBlob: Blob, deckInfo: DeckInfo): Promise<Blob>`
  - PNGバイナリにtEXtチャンクを追加
  - キー: "DeckInfo"
  - 値: JSON.stringify({main: [...], extra: [...], side: [...]})
- [ ] `extractDeckInfoFromPNG(pngBlob: Blob): Promise<DeckInfo | null>`
  - PNGバイナリからtEXtチャンクを抽出
  - JSON.parseでデッキ情報を復元

#### 2. エクスポート機能拡張 (`src/utils/deck-export.ts`)
- [ ] `exportToPNG(deckInfo: DeckInfo, options): Promise<Blob>`
  - createDeckRecipeImage を呼び出して画像生成
  - embedDeckInfoToPNG でメタデータ埋め込み
- [ ] `downloadDeckAsPNG(deckInfo, filename, options)`
  - PNG画像をダウンロード

#### 3. インポート機能拡張 (`src/utils/deck-import.ts`)
- [ ] `importFromPNG(file: File): Promise<ImportResult>`
  - extractDeckInfoFromPNG でメタデータ抽出
  - 抽出失敗時はエラーメッセージ
- [ ] `importDeckFromFile` 修正
  - PNG形式（.png）に対応

#### 4. テスト
- [ ] ユニットテスト作成
- [ ] E2Eテスト（エクスポート→インポート）

### 完了条件
- [x] PNG埋め込みユーティリティ実装
- [x] エクスポート機能でPNG形式に対応
- [x] インポート機能でPNG形式に対応
- [x] テスト作成と実行

### 残タスク
- [x] ExportDialogにPNG形式を追加
- [x] ImportDialogでPNG形式に対応
- [x] ビルド・デプロイ
- [x] バージョン更新とコミット (v0.3.9)

### オプション（後で実装可能）
- [ ] PNG画像プレビュー表示（ImportDialog）
- [ ] PNG画像エクスポートオプション詳細設定（scale, color, QR）
- [ ] ブラウザE2Eテスト（実際のデッキ画像で検証）
