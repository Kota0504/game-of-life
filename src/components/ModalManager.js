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

  // キューをチェックし、必要に応じてモーダルを表示する
  checkQueue() {
    if (this.isShowing || this.queue.length === 0) {
      return; // すでに表示中、またはキューが空なら何もしない
    }
    this.isShowing = true;
    const { message, duration } = this.queue.shift(); // キューから一つ取り出す

    this.updateModalState(true, message); // モーダルを表示

    setTimeout(() => {
      this.updateModalState(false, "");
      this.isShowing = false;
      this.checkQueue(); // 次のモーダルがあれば表示する
    }, duration);
  }
}
export default ModalManager;
