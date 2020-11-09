class HomeController < ApplicationController
  def index
  end

  def new 
    token = User.decode(request.headers['token'])
    if token  
      head 200
    else 
      head 403
    end
  end

  def sign_up
  end

  def log_in
  end
end
