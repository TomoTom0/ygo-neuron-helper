# Yu-Gi-Oh! Deck Helper

遊戯王公式サイト（Yu-Gi-Oh! Card Database）のデッキ管理を快適にするChrome拡張機能

## ✨ 機能（予定）

- 🎴 GUIでの快適なデッキ編集
- 📥📤 デッキのインポート/エクスポート
- 📊 デッキの差分履歴管理
- 🔗 デッキの共有
- 🔍 強化されたカード検索
- 🔄 公式サービスとの密なデータ連携

## 🚀 開発状況

現在開発中（v0.1.0）

### 完了
- ✅ プロジェクト初期セットアップ
- ✅ 基本的なChrome拡張機能の構造
- ✅ TypeScript環境構築
- ✅ Webpack設定

### 進行中
- 🔄 KONAMI ID認証の調査
- 🔄 公式API調査

## 🛠️ 開発

### 必要要件

- Node.js 18以上
- npm または yarn

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発モードでビルド（ウォッチモード）
npm run dev

# プロダクションビルド
npm run build

# 型チェック
npm run type-check
```

### Chrome拡張機能として読み込む

1. `npm run build` でビルド
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパーモード」を有効化
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. `dist/` ディレクトリを選択

## 📁 プロジェクト構造

```
ygo-deck-helper/
├── src/
│   ├── background/      # Background Service Worker
│   ├── content/         # Content Scripts
│   ├── popup/           # Popup UI
│   ├── api/             # API wrappers
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/
│   ├── manifest.json    # Extension manifest
│   └── icons/           # Extension icons
├── dist/                # Build output
├── docs/                # Documentation
└── tasks/               # Development tasks
```

## 📝 注意事項

これは非公式のツールです。遊戯王公式サイトの利用規約を遵守してご使用ください。

## 📄 ライセンス

ISC

## 🔗 関連リンク

- [遊戯王カードデータベース](https://www.db.yugioh-card.com/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
