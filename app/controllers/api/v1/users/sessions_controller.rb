# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        skip_before_action :verify_authenticity_token, only: :create
        before_action :load_user, only: :create

        def create
          if @user.valid_password?(sign_in_params[:password])
            token = User.generate_token(@user.email)
            @user.update_attributes(auth_token: token)
            render json: token, status: :ok
          else
            head 401
          end
        end

        def verify
          token = User.decode(request.headers['token'])
          user = User.find_by_email(token['user'])
          if token
            render json: { user: true, admin: user.admin }, status: 200
          else
            head 403
          end
        end

        protected

        def sign_in_params
          params.require(:user).permit(:email, :password)
        end

        def load_user
          @user = User.find_for_database_authentication(email: sign_in_params[:email])
          @user || render(json: {
                            messages: 'Cannot get User',
                            is_success: false,
                            data: {}
                          }, status: :not_found)
        end
      end
    end
  end
end
