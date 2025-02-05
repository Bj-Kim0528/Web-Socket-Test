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
      // 전체 온라인 사용자 목록을 새로 구성
      const onlineUsersEl = document.getElementById("online-users");
      onlineUsersEl.innerHTML = ""; // 기존 목록 초기화
      data.users.forEach(user => {
        if (!document.getElementById("user-" + user)) {
          const li = document.createElement("li");
          li.textContent = user;
          li.id = "user-" + user;
          onlineUsersEl.appendChild(li);
        }
      });
    } else if (data.type === "update") {
      // 개별 업데이트 처리 (앞서 구현한 코드와 동일)
      const onlineUsersEl = document.getElementById("online-users");
      if (data.status === "online") {
        if (!document.getElementById("user-" + data.user)) {
          const li = document.createElement("li");
          li.textContent = data.user;
          li.id = "user-" + data.user;
          onlineUsersEl.appendChild(li);
        }
      } else if (data.status === "offline") {
        const userEl = document.getElementById("user-" + data.user);
        if (userEl) {
          userEl.remove();
        }
      }
    }
  }  
});

export default presenceChannel;

