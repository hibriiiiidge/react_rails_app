Rails.application.routes.draw do
  resources :messages, only: [:index, :create, :show, :update, :destroy], format: 'json'  do
    post 'search' => "messages#search", on: :collection, format: 'json'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
