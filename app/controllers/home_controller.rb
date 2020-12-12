class HomeController < ApplicationController
  before_action :find_user, only: [:new]
  
  def index
  end

  def new 
    if @user.admin  
      head 200
    else 
      head 403
    end
  end

  def log_in
  end

  def sign_up
  end

  
  def all_orders
  end

  def user_orders
  end

  private 

  def find_user
    user_from_token = User.decode(request.headers['token'])
    @user = User.find_by_email(user_from_token['user'])
  end
end
