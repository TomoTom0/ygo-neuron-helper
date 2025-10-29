# 01. 調査タスク

## 目的
遊戯王公式サイト（Yu-Gi-Oh! Card Database）のAPI、認証、制限を詳細に調査する

## タスク

### 認証・ログイン調査（優先度: 高）
- [x] KONAMI IDのログイン仕組みを調査
  - [x] ログインフロー（OAuth 2.0 Authorization Code Flow）
  - [x] セッション管理方法（JSESSIONID cookie）
  - [x] 認証トークンの取得方法（OAuth経由）
  - [ ] トークンの有効期限と更新方法
- [x] Chrome拡張機能からの認証情報アクセス可否
- [x] セキュリティ制約（SameSite Cookie, HTTPOnlyなど）

### API/データ取得調査
- [x] カード検索APIの詳細調査
  - [x] リクエストパラメータの基本リスト
  - [x] レスポンス形式（HTML）とHTMLパース必要性確認
  - [ ] ページネーション仕様の詳細
  - [ ] レート制限の有無
- [ ] カード画像取得方法
  - [ ] CORS制限の詳細確認
  - [ ] 回避方法（Chrome拡張機能のpermissions活用）
- [ ] デッキ関連API調査
  - [x] 基本的なエンドポイント特定
  - [ ] デッキ一覧取得の実際のリクエスト/レスポンス
  - [ ] 個別デッキ取得の詳細
  - [ ] デッキ作成/編集/削除のエンドポイント詳細
  - [ ] 必要なパラメータ（cgid, ytkn, dnoなど）の取得方法

### CSRF/セキュリティトークン調査
- [ ] ytknトークンの取得方法と使用方法
- [ ] cgidの役割と取得方法
- [x] CSRFトークンの有無と処理方法（OAuth stateパラメータ）

### 制限事項の確認
- [ ] APIレート制限の有無と詳細
- [ ] 同時リクエスト数の制限
- [ ] セッションタイムアウト
- [x] CORS制限の基本確認（Imperva WAF使用）

### ブラウザ環境での動作確認
- [ ] Chrome拡張機能のcontent scriptでの動作確認
- [ ] background scriptでの動作確認
- [ ] 必要なpermissionsのリスト作成

## 完了条件
- [x] 認証フローが明確に理解できている → OAuth 2.0フロー確認済み
- [ ] 全ての必要なAPIエンドポイントとパラメータが文書化されている → 70%完了
- [ ] 技術的制約が明確になり、実装方針が決定できる → 基本方針決定済み

## 調査レポート
- `docs/research/01-initial-investigation.md` - 基本情報
- `docs/research/02-auth-flow.md` - 認証フロー詳細
- `docs/research/03-deck-api.md` - デッキAPI調査（要実機確認）

