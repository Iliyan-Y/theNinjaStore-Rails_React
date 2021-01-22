module RegistrationsHelper
  def display_error(params)
    return 'User already exists' if User.find_by_email(params[:user][:email])

    return 'Password not match' unless params[:user][:password] == params[:user][:password_confirmation]

    return 'Password must be at least 6 characters' unless params[:user][:password].length > 5

    'Something went wrong please check your details and try again'
  end
end
