Rails.application.routes.draw do
  root 'home#index'
  get "new/product", to: "home#new"
  get "show/product", to: "home#show"
  scope :api, defaults: { format: :json } do
    scope :v1 do
      
      devise_for :users, controllers: {
        registrations: 'api/v1/users/registrations'
      }
      resources :products, only: [:index, :create, :show]
    end
  end
 
  # set all routes to point this path - used for react router
  get '*path', to: redirect('/'), constraints: lambda { |req|
  req.path.exclude? 'rails/active_storage'}

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
