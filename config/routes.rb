Rails.application.routes.draw do
  root 'home#index'
  get "new/product", to: "home#new"
  get "show/product/:id", to: "home#show"
  get "/register", to: "home#sign_up"
  get "/log-in", to: "home#log_in"
  get "/basket", to: "home#basket"
  get '/order', to: "home#order"
  get '/admin/all-orders', to: "home#all_orders"
  get '/user/orders', to: "home#user_orders" 
  
  scope '/checkout' do 
    get 'success', to: 'checkout#success', as: 'checkout_success'
    get 'cancel', to: 'checkout#cancel', as: 'checkout_cancel'
  end
  
  scope :api, defaults: { format: :json } do
    scope :v1 do
      devise_for :users, controllers: {
        registrations: 'api/v1/users/registrations',
        sessions: 'api/v1/users/sessions',
      }
    end
  end

  devise_scope :user do
    get "api/v1/users/verify", to: "api/v1/users/sessions#verify"
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do 
      resources :products, only: [:index, :create, :show, :destroy, :update]
      resources :orders, only: [:index, :create]
      post "/orders/products", to: "orders#display_products"
      patch "/orders/:id", to: "orders#change_status"
      get "/orders/user", to: "orders#user_orders"
      post '/orders/confirm', to: "orders#confirm_order"
      get '/orders/status', to: "orders#check_payment"
    end
  end

  # set all routes to point this path - used for react router
  get '*path', to: redirect('/'), constraints: lambda { |req|
  req.path.exclude? 'rails/active_storage'}

  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
