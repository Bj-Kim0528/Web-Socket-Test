// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
// 로그아웃 시 Action Cable 연결 종료 함수
function disconnectCable() {
  if (window.consumer && typeof window.consumer.disconnect === "function") {
    window.consumer.disconnect();
    console.log("Action Cable 연결 종료");
  }
}

// 로그아웃 버튼에 연결 (예: 버튼에 id="logout-button"이 있다고 가정)
document.addEventListener("turbolinks:load", () => {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (window.consumer && typeof window.consumer.disconnect === "function") {
        window.consumer.disconnect();
        console.log("Action Cable 연결 종료됨 (로그아웃)");
      }
    });
  }
});


Rails.start()
Turbolinks.start()
ActiveStorage.start()
