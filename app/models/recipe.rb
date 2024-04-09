class Recipe
  include Mongoid::Document
  include Mongoid::Timestamps
 store_in collection: "RubyRecipe"
  field :title, type: String
  field :instructions, type: String
  field :ingredients, type: String
  field :photo, type: String
  field :thumb, type: String
  field :video, type: String
  field :category, type: String
  field :area, type: String
  field :source, type: String

  

end
