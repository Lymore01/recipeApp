Rails.application.routes.draw do
   resources :recipes, defaults: { format: :json }
   get 'new_recipe', to: 'recipes#new'
   get 'recipe', to: 'recipe#recipe'
   
end
