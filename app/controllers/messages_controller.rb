class MessagesController < ApplicationController
  before_action :set_message, only: [:show]
  
  def index
    messages = Message.all
    render json: messages
  end

  def create
    message = Message.new(message_params)
    message.save!
    render json
  end
  
  def show
    render json: @message
  end

  private
  
  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:title, :content)
  end
end
