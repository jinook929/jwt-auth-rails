Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # localhost:3000/api/v1/login
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end
end
