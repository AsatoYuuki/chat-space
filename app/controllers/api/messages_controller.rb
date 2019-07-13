class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:id])
    @messages = @group.messages.includes(:user).where("id > ? ",params[:last_id])

  end
end

 