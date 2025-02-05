# app/models/online_user_store.rb
class OnlineUserStore
  require 'set'
  @@online_users = Set.new

  def self.add(user_email)
    @@online_users.add(user_email)
  end

  def self.remove(user_email)
    @@online_users.delete(user_email)
  end

  def self.all
    @@online_users.to_a
  end
end
