Rails.application.routes.draw do
  root 'home#index'
  get "new/product", to: "home#new"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [:index, :create]
    end
  end
 
  # set all routes to point this path - used for react router
  get '*path', to: redirect('/'), constraints: lambda { |req|
  req.path.exclude? 'rails/active_storage'}

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
