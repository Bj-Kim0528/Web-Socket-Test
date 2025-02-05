// app/javascript/channels/chat_channel.js

import consumer from "./consumer"

// 먼저 chatChannel 변수를 선언합니다.
const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("ChatChannel에 연결되었습니다.");
  },

  disconnected() {
    console.log("ChatChannel 연결이 해제되었습니다.");
  },

  received(data) {
    console.log("서버에서 보낸 데이터:", data);
    const messages = document.getElementById("messages");
    if (messages) {
      messages.insertAdjacentHTML("beforeend", `<p>${data.message}</p>`);
    }
  },

  speak(message) {
    this.perform("speak", { message: message });
  }
});

// 선언된 chatChannel을 전역 객체에 할당합니다.
window.chatChannel = chatChannel;

// chatChannel을 export합니다.
export default chatChannel;
