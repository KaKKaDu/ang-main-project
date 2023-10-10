
import { Recipe } from "src/app/shared/models/recipe.model"; 
import { Ingredient } from "../../shared/models/ingredient.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()

export class RecipesService {
  recipeChange = new Subject<Recipe[]>

  private recipes: Recipe[] = [
    new Recipe(
      'Gluten-free pancakes',
      'Gluten-free and really easy-to-make!', 
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/324/324494/gluten-free-pancakes-for-different-diets-topped-with-blueberries-and-nuts.jpg',
      [
        new Ingredient('Flower(g)', 200),
        new Ingredient('Eggs', 3)
      ]
      ),
    new Recipe(
      'Pasta with fish', 
      'Really fast-to-do and extremely tasty!', 
      'https://freefoodphotos.com/imagelibrary/meals/slides/creamy_chicken_tagliatelle.jpg',
      [
        new Ingredient('Pasta(g)', 300),
        new Ingredient('Fish(g)', 200)
      ]
      )];

  serverDataUpdate(baseRecipeData: Recipe[]) {
    this.recipes = baseRecipeData;
    this.recipeChange.next(this.getRecipes());
  }

  findRecipeDetails(name:string) {
    const recipe = this.recipes.find(
      (recipe): recipe is Recipe => {
        return recipe.name === name
      })
    return recipe;
  }

  changeRecipe(index: number, recipeDetails: Recipe) {
    this.recipes[index] = recipeDetails;
    this.recipeChange.next(this.getRecipes());
  }

  pushRecipe(recipeDetails: Recipe) {
    this.recipes.push(recipeDetails);
    this.recipeChange.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.getRecipes());
  }

  findRecipeIndex(name: string) {
    const index = this.recipes.findIndex(
      (recipe): recipe is Recipe => {
        return recipe.name === name;
      }
    )
    return index;
  }

  getRecipes() {
    return this.recipes.slice();
  }
}