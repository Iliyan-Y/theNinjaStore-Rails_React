Rails.application.routes.draw do
  get 'test/index'
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [:index]
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
