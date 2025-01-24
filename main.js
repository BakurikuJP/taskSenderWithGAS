function sendDailyTasksFromTasksAPI() {
    // 本日日付の取得と期間の計算（1週間前から3日後まで）
    const today = new Date();
    const threeDaysLater = new Date(today);
    const oneWeekAgo = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    oneWeekAgo.setDate(today.getDate() - 7);
  
    // 送信するタスクリストの作成
    let taskList = "";
    let count = 0;
    
    // Google Tasks API からタスクリストを取得
    const taskLists = Tasks.Tasklists.list().items;
  
    if(!taskLists){
      Logger.log("タスクリストが見つかりませんでした。");
      return;
    }
  
    for (let taskListObj of taskLists) {
      const tasks = Tasks.Tasks.list(taskListObj.id, { showCompleted: false }).items;
  
      if (tasks) {
         for (let task of tasks) {
            if (task.due) {
               const dueDate = new Date(task.due);
              
              // 締切日が1週間前から3日後までの場合、リストに追加
              if (dueDate >= oneWeekAgo && dueDate <= threeDaysLater) {
                  count++;
                  const formattedDueDate = Utilities.formatDate(dueDate, Session.getScriptTimeZone(), 'yyyy/MM/dd');
                  taskList += `- [ ] ${task.title} (締切: ${formattedDueDate})\n`;
              }
           }
        }
      }
    }
    
    if (count > 0) {
      // メール送信
      const recipient = Session.getActiveUser().getEmail(); // 実行者のメールアドレスを使用
      const subject = "【1週間前から3日後までの締切】Google ToDoリスト";
      const body = `1週間前から3日後までの締切のあるGoogle ToDoリストをお知らせします。\n\n${taskList}\n\n以上です。`;
  
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        body: body,
      });
      Logger.log("メールを送信しました。");
    } else {
      Logger.log("該当するToDoはありませんでした。");
    }
  }