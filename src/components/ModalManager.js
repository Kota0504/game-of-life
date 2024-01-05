class ModalManager {
  constructor(updateModalState) {
    this.updateModalState = updateModalState;
    this.queue = []; // モーダル表示リクエストを格納するキュー
    this.isShowing = false; // 現在モーダルが表示されているかどうか
  }

  // モーダルをキューに追加する
  queueModal(message, duration) {
    this.queue.push({ message, duration });
    this.checkQueue();
  }

  // ユーザーに選択肢を提示するモーダルをキューに追加する新しいメソッド
  queueChoiceModal(title, choices, onChoice) {
    this.queue.push({ title, choices, onChoice });
    this.checkQueue();
  }
  // キューをチェックし、必要に応じてモーダルを表示する
  checkQueue() {
    if (this.isShowing || this.queue.length === 0) {
      return;
    }
    this.isShowing = true;
    const { message, duration, title, choices, onChoice } = this.queue.shift();

    // 選択肢がある場合、モーダルを表示してユーザーの選択を処理
    if (choices) {
      this.updateModalState(true, title, choices);
      // ユーザーの選択を待つため、ここではsetTimeoutを設定しない
      // 選択後にはonChoiceが呼ばれる想定
    } else {
      // 通常のメッセージモーダルを表示
      this.updateModalState(true, message);
      setTimeout(() => {
        this.updateModalState(false, "");
        this.isShowing = false;
        if (this.queue.length > 0) {
          this.checkQueue();
        }
      }, duration);
    }
  }
}
export default ModalManager;
