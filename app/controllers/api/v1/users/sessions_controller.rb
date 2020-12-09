class Api::V1::Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, :only => :create
  before_action :load_user, only: :create

  def create
    if @user.valid_password?(sign_in_params[:password])
      token = User.generate_token(@user.email)
      @user.update_attributes(auth_token: token)
      render json: {
        messages: "Signed In Successfully",
        is_success: true,
        data: {user: @user}
      }, status: :ok
    else
      render json: {
        messages: "Signed In Failed - Unauthorized",
        is_success: false,
        data: {}
      }, status: :unauthorized
    end
  end

  def verify
    token = User.decode(request.headers['token'])
    user = User.find_by_email(token['user'])
    if token  
      render json:{user:true, admin: user.admin}, status: 200
    else 
      head 403
    end
  end


  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  def load_user
    @user = User.find_for_database_authentication(email: sign_in_params[:email])
    if @user
      return @user
    else
      render json: {
        messages: "Cannot get User",
        is_success: false,
        data: {}
      }, status: :not_found
    end
  end

end
