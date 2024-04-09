class RecipesController < ApplicationController
before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    @recipes = Recipe.all
     respond_to do |format|
       format.json { render json: @recipes }
     end
  end

  def show
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      flash[:notice] = "Recipe was successfully created."
    else
      flash[:notice] = "Recipe was not successfully created!!"
      render new_recipe
    end
  end

  def edit
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: 'Recipe was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_url, notice: 'Recipe was successfully destroyed.'
  end

  private

  def set_recipe
    @recipe = Recipe.find_by(title: params[:id])
    render json: @recipe
  end
  

  def recipe_params
    params.require(:recipe).permit(:title, :instructions, :ingredients, :photo,:thumb, :video, :category, :area, :source)
  end
end
