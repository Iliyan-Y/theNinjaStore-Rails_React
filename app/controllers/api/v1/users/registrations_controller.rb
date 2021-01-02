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
            render json: {
              messages: 'Sign Up Successfully',
              is_success: true,
              data: { user: user }
            }, status: :ok
          else
            render json: {
              messages: 'Sign Up Failed',
              is_success: false,
              data: {}
            }, status: :unprocessable_entity
          end
        end

        protected

        def user_params
          params.require(:user).permit(:email, :password, :password_confirmation)
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
