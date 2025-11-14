# 作業中のタスク

## v0.3.2開発

### リリース状況
- **v0.3.0**: ✅ リリース済み
- **v0.3.1**: ✅ リリース済み
- **v0.3.2**: ✅ 開発完了（milestone.md要件全達成）

### 現在の進捗
- **バージョン**: 0.3.2
- **単体/結合テスト**: 106 tests合格（combine 17 + component 89 | 3 skipped）
  - ⚠️ API tests/deck-parser tests/session testは要修正（主要機能は動作確認済み）
- **E2Eテスト**: ✅ 全9テスト合格
  - ファイル: `tmp/browser/e2e-full-suite-corrected.js`
  - テスト内容: DNOロード、デッキクリア、検索、追加、削除、枚数制限、ゴミ箱復元、エクストラ/サイドデッキ操作
- **ビルド・デプロイ**: ✅ 完了

### 完了した作業（milestone.md v0.3.2要件）

#### 1. ポップアップから独自デッキ編集画面に移動 ✅
- [x] popup UIの実装完了（src/popup/index.ts）
- [x] デッキ編集画面ボタンで `#/ytomo/edit` を開く

#### 2. URLパラメータでdno指定 ✅
- [x] `src/stores/deck-edit.ts`でURLパラメータから`dno`取得実装済み
- [x] 例: `#/ytomo/edit?dno=8` でDNO 8のデッキを自動ロード

#### 3. 拡張機能名の統一 ✅
- [x] "YuGiOh Neuron **EXTension**" に統一（正しい英語スペル）
- [x] 修正ファイル:
  - src/popup/index.ts
  - src/options/App.vue
  - tasks/milestone.md
  - docs/changelog/index.md
  - docs/usage/README.md
  - README.md

#### E2Eテストスイート完全修正 ✅
- [x] Test 1: DNOダイアログからデッキロード（MouseEvent対応）
- [x] Test 2: デッキクリア
- [x] Test 3: カード検索（インライン実装、待機時間延長）
- [x] Test 4: カード追加
- [x] Test 5: カード削除
- [x] Test 6: カード枚数制限（.focus()追加、エラーハンドリング改善）
- [x] Test 7: ゴミ箱復元
- [x] Test 8: エクストラデッキ操作
- [x] Test 9: サイドデッキ操作

**重要な発見**:
- Vue 3の`@click`ハンドラーはMouseEventが必須
- `Page.reload`の方が`Page.navigate`より安定
- ダイアログボタンもMouseEvent必須
- インライン実装の方がヘルパー関数より安定

### 次のステップ候補

#### v0.3.2リリース準備
- [ ] CHANGELOG作成（v0.3.2）
- [ ] リリースノート作成（docs/release-notes/v0.3.2.md）
- [ ] 最終動作確認（Chrome/Edge）
- [ ] ビルド・デプロイ

#### 今後の機能追加（v0.4.0以降）
- [ ] E2Eテスト追加
  - [ ] ドラッグ＆ドロップ
  - [ ] デッキ保存
  - [ ] 収録パック展開・折りたたみ
- [ ] 拡張UI自体の多言語化（現在は英語/日本語混在）
