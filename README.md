# タスクメール送信 GAS スクリプト

Google Tasks APIを使用して、期限が近いタスクを自動的にメールで通知するGoogle Apps Scriptプロジェクトです。

## 機能

- Google Tasksから1週間前から3日後までの期限があるタスクを取得
- 取得したタスクを整形してメールで通知
- 実行者のメールアドレスに自動送信

## 使用方法

1. Google Apps Scriptプロジェクトを作成
2. `main.js`のコードをエディタにコピー
3. 以下のAPIを有効化:
   - Google Tasks API
4. プロジェクトのトリガーを設定して定期実行（推奨：毎日）

## 出力形式

メールの内容は以下の形式で送信されます：
```
【1週間前から3日後までの締切】Google ToDoリスト

- [ ] タスク1 (締切: YYYY/MM/DD)
- [ ] タスク2 (締切: YYYY/MM/DD)
...
```

## 注意事項

- スクリプトを実行するには、Google Tasks APIの有効化が必要です
- 実行にはGoogle Apps Script の権限が必要です 