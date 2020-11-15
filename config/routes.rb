Rails.application.routes.draw do
  root 'home#index'
  get "new/product", to: "home#new"
  get "show/product", to: "home#show"
  # get "/register", to: "home#sign_up"
  get "/login", to: "home#log_in"
  get "/basket", to: "home#basket"
  get '/order', to: "home#order"

  scope :api, defaults: { format: :json } do
    scope :v1 do

      devise_for :users, controllers: {
        registrations: 'api/v1/users/registrations',
        sessions: 'api/v1/users/sessions',
      }
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do 
      resources :products, only: [:index, :create, :show, :destroy, :update]
      resources :orders, only: [:create]
    end
  end

  # set all routes to point this path - used for react router
  get '*path', to: redirect('/'), constraints: lambda { |req|
  req.path.exclude? 'rails/active_storage'}

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
