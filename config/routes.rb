Rails.application.routes.draw do
  resources :messages, only: [:index, :create, :show], format: 'json'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
