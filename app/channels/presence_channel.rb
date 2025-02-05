class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "presence_channel"
    OnlineUserStore.add(current_user.email)
    # 모든 클라이언트에 전체 목록 갱신 메시지 전송
    ActionCable.server.broadcast("presence_channel", { users: OnlineUserStore.all, type: "full_update" })
    # 자신의 상태 업데이트
    ActionCable.server.broadcast("presence_channel", { user: current_user.email, status: "online", type: "update" })
  end

  def unsubscribed
    # 연결 해제 시 온라인 사용자 목록에서 제거
    OnlineUserStore.remove(current_user.email)
    ActionCable.server.broadcast("presence_channel", { user: current_user.email, status: "offline", type: "update" })
  end
end
