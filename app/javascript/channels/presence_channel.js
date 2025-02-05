import consumer from "./consumer"

const presenceChannel = consumer.subscriptions.create("PresenceChannel", {
  connected() {
    console.log("PresenceChannel에 연결되었습니다.");
  },

  disconnected() {
    console.log("PresenceChannel 연결이 해제되었습니다.");
  },

  received(data) {
    if (data.type === "full_update") {
      // 전체 온라인 사용자 목록을 새로 구성합니다.
      const onlineUsersEl = document.getElementById("online-users");
      if (onlineUsersEl) {
        onlineUsersEl.innerHTML = ""; // 기존 목록 초기화
        data.users.forEach(user => {
          const li = document.createElement("li");
          li.textContent = user;
          li.id = "user-" + user; // 예: "user-1@1"
          onlineUsersEl.appendChild(li);
        });
      } else {
        console.error("online-users 요소를 찾을 수 없습니다.");
      }
    }
    // 필요하다면 개별 업데이트(update) 처리 로직도 추가할 수 있습니다.
  }
});

export default presenceChannel;
