## 2025-11-17: デッキインポート機能実装

- **タイムスタンプ**: 2025-11-17 22:45
- **バージョン**: 0.3.8
- **ブランチ**: `feature/v0.4.0-foundation`

### 実装内容

**デッキインポート機能の追加**
- `src/utils/deck-import.ts`: CSV/TXT形式のインポート機能
  - `importFromCSV()`: CSV形式のパース（ヘッダー行、複数形式対応）
  - `importFromTXT()`: TXT形式のパース（セクション別、人間が読みやすい形式）
  - `importDeckFromFile()`: ファイル自動判定とインポート
  - フレキシブルな形式サポート:
    - name列はオプション（インポート時は無視）
    - ciidが1の場合は省略可能
    - 同じcidを複数行で記載可能
  - エラーハンドリングと警告メッセージ

- `src/components/ImportDialog.vue`: インポートダイアログUI
  - ファイル選択（.csv, .txt）
  - プレビュー機能（Main/Extra/Sideのカード数表示）
  - 警告メッセージ表示
  - インポートオプション：既存デッキを置き換え or 追加

- `src/components/DeckEditTopBar.vue`: メニュー統合
  - "Import Deck" メニュー項目追加
  - mdiImportアイコン使用
  - インポート成功時のトースト通知

### TypeScript型対応
- CardInfo型の仮データ生成（後でAPIから正しい情報を取得する想定）
- DeckInfo型の完全なフィールド初期化
- strictモードでの`possibly undefined`エラー対応

### ビルド・デプロイ
- ビルド成功（2 warnings）
- デプロイ完了: `/home/tomo/user/Mine/_chex/src_ygoNeuronHelper`

---

# DONE

最近完了したタスク（簡潔版）

> **詳細な履歴**: `docs/_archived/tasks/done_before_2025-11-17.md` を参照

---

## 2025-11-17: デッキ画像作成ダイアログ - ダウンロードボタンホバー効果追加

- **タイムスタンプ**: 2025-11-17 21:30
- **バージョン**: 0.3.7
- **ブランチ**: `feature/v0.4.0-foundation`

### 実装内容

**ダウンロードボタンのホバー効果強化**
- 背景色変化: `rgba(70, 120, 255, 0.15)` （青い半透明背景）
- ボーダー色変化: `rgba(70, 120, 255, 0.5)` （青い半透明ボーダー）
- 不透明度変化: 0.7 → 1.0
- 位置移動: `translateY(-1px)` （わずかに上に移動）
- 影効果: `0 2px 8px rgba(0, 0, 0, 0.2)` （ボタンが浮き上がる）

### 修正ファイル

- `src/content/deck-recipe/imageDialog.ts` (lines 243-249)

### ビルド・デプロイ

- ✅ ビルド成功
- ✅ デプロイ完了（`/mnt/c/Users/tomo/Mine/_chex/src_ygoNeuronHelper`）

---

## 2025-11-17: 複数ciid対応 - Load時のイラスト違いカード正しくパース

- **タイムスタンプ**: 2025-11-17 20:30
- **バージョン**: 0.3.7
- **ブランチ**: `feature/v0.4.0-foundation`
- **コミット**: `2c0a62f`

### 問題

**Load時に複数ciidを持つカードがciid=1で上書きされる**
- デッキをLoadすると、イラスト違い（ciid違い）の情報が失われる
- 例: 灰流うらら ciid=2が1枚、ciid=1が2枚のデッキをLoadすると、全てciid=1になる
- ciid=2のカード画像が裏面になる

### 原因

1. **`extractImageInfo`の問題**: 同じcidで複数のciidがあっても、最後のciidで上書きされる
2. **`parseCardBase`の問題**: `imgs`配列に1つのciidしか含まれない
3. **`parseCardSection`の問題**: ciidごとに別レコードを作成していない

### 解決策

**HTMLの`<img>`タグから各ciidの枚数とimgHashを抽出**

1. **`extractCiidCounts`関数を追加**:
   - HTMLの`<img class="card_image_{type}_{index}_{ciid}">`タグを検索
   - Monster, Spell, Trap, Extra の全カードタイプに対応
   - JavaScriptから`cid`と`imgHash`（enc）を抽出
   - `cid → ciid → { count, imgHash }`のマップを生成

2. **`parseCardSection`関数を修正**:
   - ciid情報がない場合: 従来通り1レコード
   - 単一ciidの場合: 正しいciidとimgs配列を設定した1レコード
   - **複数ciidの場合: ciidごとに別レコードとして追加**
   - 各レコードに正しい`imgs: [{ ciid, imgHash }]`を設定

3. **`parseDeckDetail`関数を修正**:
   - `extractCiidCounts`を呼び出してciid情報を取得
   - 各セクション（main, extra, side）に渡す

### テスト

- **テストデッキ**: dno=8 (urls.mdに記載)
- **テストカード**: 灰流うらら (cid=12950)
  - ciid=1: 2枚
  - ciid=2: 1枚
- **確認項目**:
  - ✅ Load時に3レコード生成される（ciid=1×2, ciid=2×1）
  - ✅ ciid=2のカード画像が正しく表示される（裏面にならない）
  - ✅ 各レコードに正しいimgHashが設定される

### 実装ファイル

- `src/content/parser/deck-detail-parser.ts`
  - `extractCiidCounts` 関数追加 (+58行)
  - `parseCardSection` 関数修正 (+45行)
  - `parseDeckDetail` 関数修正 (+3行)

---

## 2025-11-17: v0.4.0 Phase 1基盤整備完了 - 設定ストア・USP実装

- **タイムスタンプ**: 2025-11-17 21:00
- **バージョン**: 0.3.7（Phase 1基盤完成）
- **ブランチ**: `feature/v0.4.0-foundation`

### 実装内容

#### 1. 設定ストアの作成

**ファイル**: `src/stores/settings.ts`, `src/types/settings.ts`

**機能**:
- ✅ 画像サイズ設定（4段階: small/medium/large/xlarge）
- ✅ テーマ設定（3種: light/dark/system）
- ✅ 言語設定（auto + 10言語: ja/en/ko/ae/cn/de/fr/it/es/pt）
- ✅ chrome.storage.local永続化
- ✅ リアルタイム適用（applyTheme, applyCardSize）

#### 2. USP（URL State Parameters）実装

**ファイル**: `src/utils/url-state.ts`

**機能**:
- ✅ URLパラメータ定義（dno/mode/sort/tab/ctab/detail/size/theme/lang）
- ✅ UI状態の双方向同期（syncUIStateToURL, restoreUIStateFromURL）
- ✅ 設定の双方向同期（syncSettingsToURL, restoreSettingsFromURL）
- ✅ ハッシュルーティング対応

#### 3. 統合状況

- ✅ `src/stores/deck-edit.ts`でURLStateManager使用
- ✅ `src/stores/deck-edit.ts`でuseSettingsStore使用
- ✅ テーマとカードサイズの動的適用実装済み

### 意義

**Phase 1完了条件を達成**:
- ✅ USP（URL State Parameters）による状態管理
- ✅ 画像サイズ4段階切り替え
- ✅ カラーテーマ3種（dark/light/system）
- ✅ 言語切り替え（10言語 + auto）

これにより：
1. ブックマーク可能なURL（設定含む全状態を保持）
2. リロード時の状態復元
3. URL共有による設定共有
4. ユーザー設定の永続化

が実現された。

---

## それ以前の履歴

詳細な履歴は `docs/_archived/tasks/done_before_2025-11-17.md` を参照してください。
