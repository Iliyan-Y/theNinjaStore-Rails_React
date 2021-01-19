# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        skip_before_action :verify_authenticity_token, only: :create
        # protect_from_forgery with: :null_session

        def create
          token = User.generate_token(params[:user][:email])
          user = User.new(user_params.merge(auth_token: token))
          if user.save
            head 200
          else
            render json: display_error(params), status: 422
          end
        end

        protected

        def user_params
          params.require(:user).permit(:email, :password, :password_confirmation)
        end

        def display_error(params)
          return 'User already exists' if User.find_by_email(params[:user][:email])

          return 'Password not match' unless params[:user][:password] == params[:user][:password_confirmation]

          return 'Password must be at least 5 characters' unless params[:user][:password].length > 5

          'Something went wrong please try again'
        end

        def ensure_params_exist
          return if params[:user].present?

          render json: {
            messages: 'Missing Params',
            is_success: false,
            data: {}
          }, status: :bad_request
        end
      end
    end
  end
end
