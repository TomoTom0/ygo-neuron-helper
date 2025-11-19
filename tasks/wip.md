# 作業中のタスク

## 2025-11-20: 内部レビュー対応（CI/CD改善）

### 対応中のレポート

#### 09_ci-cd-review（CI/CDレビュー）+ 10_dependency-license-report（依存関係監査）
- **優先度**: 🔴 高（開発効率・品質保証）
- **対象**: GitHub Actions ワークフロー整備
- **現状**:
  - ワークフロー: `branch-protection.yml` のみ（ブランチポリシーチェック）
  - ビルド/テスト自動化: なし
  - 依存脆弱性: ✅ 0件（08レポートで既に解決済み）
- **主要タスク**:
  1. 高優先（🔴）:
     - CI ワークフロー追加（build + test:unit）
     - キャッシュ戦略導入（npm, Playwright）
     - E2E実行ポリシー策定
  2. 中優先（🟡）:
     - Dependabot / Renovate 導入検討
     - 最小権限設定
  3. 低優先（🟢）:
     - デプロイワークフロー（手動トリガー）
- **レポート**: 
  - `docs/internal-reviews/reports/wip/09_ci-cd-review.md`
  - `docs/internal-reviews/reports/wip/10_dependency-license-report.md`

---

## 完了済みタスク

完了済みタスクの詳細は `done.md` を参照してください。
