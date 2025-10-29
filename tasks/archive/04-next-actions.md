# 04. 現在の優先タスク（更新版）

## 🚀 実装方針の確定

### ✅ 確定事項
- **Content Script中心のアーキテクチャ**
- 公式サイト上で直接動作するため、認証は不要
- 開発環境ではセッション情報を取得してAPI操作

詳細: `docs/architecture/implementation-strategy.md`

---

## 🎯 今すぐ着手すべきタスク

### 1. 実機でのデータ構造確認（最優先）⭐

**ブラウザで遊戯王公式サイトにログインして調査:**

```javascript
// Chrome DevTools Console で実行

// cgid の取得方法確認
console.log('cgid:', document.querySelector('[name="cgid"]')?.value);
document.querySelectorAll('[name="cgid"]').forEach(el => console.log(el));

// ytkn の取得方法確認
console.log('ytkn:', document.querySelector('[name="ytkn"]')?.value);
document.querySelectorAll('[name="ytkn"]').forEach(el => console.log(el));

// デッキデータの構造確認
console.log('Deck elements:', document.querySelectorAll('.deck-card'));
console.log('Card elements:', document.querySelectorAll('.card-list-item'));

// セッション情報の取得
copy(document.cookie);
```

**調査項目:**
- [ ] cgid の取得方法（hidden input? JavaScript変数?）
- [ ] ytkn の取得方法
- [ ] デッキ一覧のDOM構造
- [ ] 個別デッキのDOM構造
- [ ] カード情報のDOM構造

---

### 2. 開発環境セットアップ（高優先度）

**ステップ:**

```bash
# 1. 必要なパッケージをインストール
npm install -D tsx dotenv cheerio

# 2. セッション情報設定
cp dev/session.example.env .env.local
# .env.local を編集してブラウザから取得した情報を設定

# 3. テストスクリプト実行
npx tsx dev/test-api.ts
```

**期待される結果:**
- カード検索HTMLの取得成功
- デッキ一覧HTMLの取得成功
- tmp/ ディレクトリにHTMLファイルが保存される

---

### 3. HTMLパーサーの実装（中優先度）

**次のアクション:**

```typescript
// src/utils/parser.ts を作成
// tmp/ に保存されたHTMLを使ってパーサーを開発

import * as cheerio from 'cheerio';

export function parseDeckList(html: string) {
  const $ = cheerio.load(html);
  // デッキ一覧からデータ抽出
  const decks = [];
  $('.deck-item').each((i, el) => {
    decks.push({
      id: $(el).data('deck-id'),
      name: $(el).find('.deck-name').text(),
      // ...
    });
  });
  return decks;
}
```

---

## 📋 推奨される作業順序（更新版）

### Week 1: データ構造調査と開発環境
- [x] 基本調査完了
- [ ] **実機でのDOM構造確認** ← 今ここ
- [ ] 開発用スクリプトでHTMLデータ取得
- [ ] HTMLパーサーのプロトタイプ作成

### Week 2: Content Scriptプロトタイプ
- [ ] 最小限のContent Script作成
- [ ] ページ内データ抽出の実装
- [ ] 簡易的なUI拡張（エクスポートボタン等）
- [ ] Chrome拡張機能として動作確認

### Week 3-4: コア機能実装
- [ ] デッキ管理機能
- [ ] UI改善
- [ ] データ永続化

### Week 5-6: 高度な機能
- [ ] 履歴管理
- [ ] インポート/エクスポート
- [ ] 統計機能

---

## 🛠️ 開発用ツール

### 作成済み
- ✅ `dev/session.example.env` - セッション情報テンプレート
- ✅ `dev/test-api.ts` - API動作確認スクリプト
- ✅ `dev/README.md` - 開発ツールの使い方

### 使い方
詳細は `dev/README.md` を参照

---

## ⚠️ 重要な変更点

### 認証について
- ❌ 削除: OAuth実装、認証フロー処理
- ✅ 追加: Content Scriptでページ内データ直接利用

### 開発フロー
- ✅ 開発環境でセッション情報を使ったテストが可能
- ✅ ブラウザでの動作確認が容易に

---

## 📝 次のマイルストーン

**Milestone 1: データ抽出の完成**
- 実機調査完了
- HTMLパーサー実装
- 開発環境でのテスト成功

**Milestone 2: プロトタイプ完成**
- Content Script基本実装
- 簡易的なUI拡張
- Chrome拡張機能として動作

**Milestone 3: MVP（Minimum Viable Product）**
- デッキエクスポート機能
- ローカル保存機能
- 基本的なUI改善
