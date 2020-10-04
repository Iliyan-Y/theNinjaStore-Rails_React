Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [:index, :create]
    end
  end
 
  # set all routes to point this path - used for react router
  get '*path', to: 'home#index', via: :all
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
