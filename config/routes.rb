Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "shortened_urls#index"

  resources :shortened_urls

  get '/:token', to: 'shortened_urls#redirect'
end
