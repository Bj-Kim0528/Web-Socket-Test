# app/models/online_user_store.rb
class OnlineUserStore
  # 간단히 메모리 내에 온라인 사용자 목록을 저장하는 클래스 변수
  @@online_users = []

  def self.add(user_email)
    @@online_users << user_email unless @@online_users.include?(user_email)
  end

  def self.remove(user_email)
    @@online_users.delete(user_email)
  end

  def self.all
    @@online_users
  end
end
