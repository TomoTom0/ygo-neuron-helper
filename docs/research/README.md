# 調査サマリー

## 実施済み調査（2025年10月21日）

### ✅ 完了した調査

#### 1. 基本インフラ調査
- **サーバー**: Nginx + AWS ALB + Imperva CDN/WAF
- **セキュリティ**: HTTPS強制、HSTS、複数のセキュリティヘッダー
- **セッション管理**: Cookie-based (JSESSIONID)

#### 2. 認証フロー調査 ⭐ 重要
- **認証方式**: OAuth 2.0 Authorization Code Flow
- **認証プロバイダー**: KONAMI ID (`my1.konami.net`)
- **Client ID**: `iiupvpe4ftzyqtu4t7faf56k2c5j2cvo`
- **認証フロー**:
  1. `/yugiohdb/member_login.action` にアクセス
  2. `my1.konami.net/api/authorizations` にリダイレクト
  3. ユーザーがKONAMI IDでログイン
  4. Authorization codeでコールバック
  5. JSESSIONIDが設定される

#### 3. カード検索API調査
- **エンドポイント**: `/yugiohdb/card_search.action`
- **レスポンス**: HTML（JSON APIなし）
- **フロントエンド**: jQuery 3.6.0 + jQuery UI 1.13.1
- **パース必要**: HTMLをパースしてデータ抽出

#### 4. デッキ管理API（部分的）
- **基本エンドポイント**: `/yugiohdb/member_deck.action`
- **操作タイプ** (ope パラメータ):
  - `1`: デッキ表示
  - `2`: デッキ編集
  - `4`: デッキ一覧
- **必要なパラメータ**:
  - `cgid`: ユーザー/セッション識別子（32文字hex）
  - `ytkn`: CSRFトークン（64文字hex）
  - `dno`: デッキ番号

### ⏳ 未完了（実機確認が必要）

#### デッキAPI詳細
- [ ] cgidの実際の取得方法（HTMLに埋め込み？Cookie？）
- [ ] ytknの実際の取得方法（ページ内JavaScript？）
- [ ] デッキ作成・更新・削除の実際のHTTPリクエスト
- [ ] リクエストボディの詳細構造
- [ ] エラーレスポンスの形式

#### パフォーマンス・制限
- [ ] レート制限の有無と詳細
- [ ] セッションタイムアウト時間
- [ ] 同時リクエスト制限

#### カード画像
- [ ] CORS制限の詳細
- [ ] 画像URLのパターン
- [ ] キャッシュ戦略

## Chrome拡張機能 実装方針

### ✅ 実装可能と確認された機能

1. **認証連携**
   ```javascript
   // ログインフローを新しいタブで開く
   chrome.tabs.create({
     url: 'https://www.db.yugioh-card.com/yugiohdb/member_login.action'
   });
   
   // ログイン後、cookieを取得
   chrome.cookies.get({
     url: 'https://www.db.yugioh-card.com',
     name: 'JSESSIONID'
   });
   ```

2. **コンテンツスクリプト**
   - 公式サイトのDOMを直接操作・拡張可能
   - HTMLからデータ抽出可能

3. **データ管理**
   - `chrome.storage` APIでローカルデータ保存
   - `chrome.cookies` APIでセッション管理

### 必要なPermissions

```json
{
  "permissions": [
    "storage",
    "cookies",
    "tabs"
  ],
  "host_permissions": [
    "https://www.db.yugioh-card.com/*",
    "https://my1.konami.net/*"
  ]
}
```

## 次のアクション

### 実機確認が必要（最優先）
**実際にログインして以下を確認する必要があります:**

1. Chrome DevToolsを開く
2. 遊戯王公式サイトにログイン
3. マイデッキページへ移動
4. ページのHTMLソースから`cgid`と`ytkn`を検索
5. デッキ編集操作を実施しながらネットワークタブを記録
6. すべてのリクエスト/レスポンスをキャプチャ

### 調査スクリプト作成
実機確認を効率化するため、以下を作成:
- [ ] HTMLからcgid/ytkn抽出スクリプト
- [ ] ネットワークリクエスト記録用のブックマークレット
- [ ] データ抽出用の簡易ツール

## 技術的制約のまとめ

### ✅ 問題なし
- Chrome拡張機能として実装可能
- 認証フローは標準的なOAuth 2.0
- セッション管理はcookie APIで対応可能

### ⚠️ 注意が必要
- HTMLパースが必要（JSON APIなし）
- HttpOnly cookieのためcontent scriptからは直接アクセス不可
  → background scriptで処理
- Imperva WAFによるレート制限の可能性
  → キャッシュ戦略が重要

### ❌ 制約事項
- 完全自動ログインは不可（セキュリティ上適切）
- ユーザーは通常通りKONAMI IDでログイン必要
- サーバーサイド処理（token exchange等）は不可

## 参考資料

- `docs/research/01-initial-investigation.md` - 基本情報とインフラ
- `docs/research/02-auth-flow.md` - OAuth 2.0認証フロー詳細
- `docs/research/03-deck-api.md` - デッキAPI（要実機確認）
- `docs/research/04-api-key-verification.md` - **API Key/自動ログイン可能性の検証結果**
- `docs/design/pre/research.md` - 初期調査メモ

## 重要な制約事項（追加検証済み）

### ❌ 不可能なこと
1. **公式API Keyの取得** - KONAMIはサードパーティ向けAPIを提供していない
2. **完全自動ログイン** - OAuth 2.0仕様上、ユーザー自身のログイン操作が必須
3. **認証情報の保存** - セキュリティリスクが高く推奨されない

### ✅ 実装可能な代替策
1. **既存セッションの活用** - ユーザーが通常ブラウザでログイン済みの場合、そのセッションを利用
2. **ログイン誘導** - 必要時にログインページへリダイレクト
3. **セッション監視** - Cookie変化を監視してログイン状態を追跡

詳細は `docs/research/04-api-key-verification.md` を参照。
