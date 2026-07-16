# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show update destroy], param: :slug do
      collection do
        get "my_posts"
        patch "bulk_update"
        delete "bulk_delete"
      end
    end
    resources :users, only: %i[index create]
    resources :categories, only: %i[index create]
    resources :organizations, only: :index
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
