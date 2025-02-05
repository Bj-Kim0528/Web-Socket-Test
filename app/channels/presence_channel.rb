# app/channels/presence_channel.rb
class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "presence_channel"
    @user_email = current_user.email
    OnlineUserStore.add(@user_email)
    transmit({ type: "full_update", users: OnlineUserStore.all })
    ActionCable.server.broadcast("presence_channel", { type: "update", user: @user_email, status: "online" })
  end

  def unsubscribed
    if @user_email
      OnlineUserStore.remove(@user_email)
      ActionCable.server.broadcast("presence_channel", { type: "full_update", users: OnlineUserStore.all })
      Rails.logger.info "PresenceChannel unsubscribed: #{@user_email} removed."
    end
  end
end

