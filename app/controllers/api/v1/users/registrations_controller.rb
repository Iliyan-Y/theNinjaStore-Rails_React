# frozen_string_literal: true

class  Api::V1::Users::RegistrationsController < Devise::RegistrationsController
   skip_before_action :verify_authenticity_token, :only => :create
   #protect_from_forgery with: :null_session
  
 
  def create
    token = User.generate_token({user: params[:user][:email]})
    p 'User email'
    p params[:user][:email]
    
    user = User.new(user_params.merge(auth_token: token))
      if user.save
        render json: {
          messages: "Sign Up Successfully",
          is_success: true,
          data: {user: user}
        }, status: :ok
      else
        render json: {
          messages: "Sign Up Failed",
          is_success: false,
          data: {}
        }, status: :unprocessable_entity
      end
  
  end


  # def edit
  #   super
  # end


  # def update
  #   super
  # end


  # def destroy
  #   super
  # end


  # # Forces the session data which is usually expired after sign
  # # in to be expired now. This is useful if the user wants to
  # # cancel oauth signing in/up in the middle of the process,
  # # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def ensure_params_exist
    return if params[:user].present?
    render json: {
        messages: "Missing Params",
        is_success: false,
        data: {}
      }, status: :bad_request
  end

  def create_token
  end

 #If you have extra params to permit, append them to the sanitizer.
#   def configure_sign_up_params
#     devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
#   end

#  # If you have extra params to permit, append them to the sanitizer.
#   def configure_account_update_params
#     devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
#   end

#  # The path used after sign up.
#   def after_sign_up_path_for(resource)
#     super(resource)
#   end

#  # The path used after sign up for inactive accounts.
#   def after_inactive_sign_up_path_for(resource)
#     super(resource)
#   end
end
