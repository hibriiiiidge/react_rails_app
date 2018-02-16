class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]
  
  def index
    messages = Message.all
    render json: messages
  end

  def create
    message = Message.new(message_params)
    message.save!
  end
  
  def show
    render json: @message
  end
  
  def update
    @message.update!(message_params)
  end
  
  def destroy
    @message.destroy!
  end
  
  def search
    messages = Message.search_by_title(search_params[:search])
    render json: messages
  end

  private
  
  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:title, :content)
  end
  
  def search_params
    params.require(:message).permit(:search)
  end
end
