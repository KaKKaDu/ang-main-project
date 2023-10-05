

import { Ingredient } from "../../shared/models/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

  ProductHighlighted = new Subject<number>();
  ProductEdit = new Subject<number>();
  OnAddIngredient = new Subject<Ingredient[]>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 2),
    new Ingredient('Cucumbers', 3)
  ];

  serverDataUpdate(baseIngrData: Ingredient[]) {
    this.ingredients = baseIngrData;
    this.OnAddIngredient.next(this.getShopList());
  }

  getShopList() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  editIngredient(index:number, info: Ingredient) {
    this.ingredients[index] = info;
    this.OnAddIngredient.next(this.getShopList());
    console.log('works');
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.OnAddIngredient.next(this.getShopList());
  }

  checkSimilarIngredients(ingredients: Ingredient[]):Ingredient[] {
    for(let i = 0; i < ingredients.length; i++) {
      for(let a = 0; a < ingredients.length; a++) {
        if (a === i) {
          continue
        }
        if(ingredients[i].name.trim() === ingredients[a].name.trim()) {
          ingredients[i].amount = +ingredients[i].amount + +ingredients[a].amount;
          ingredients.splice(a, 1);
          a--;
        }
      }
    }
    return ingredients;
  }

  newIngredientAdded(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredients = this.checkSimilarIngredients(this.ingredients);
    this.OnAddIngredient.next(this.getShopList());
  }

  arrayOfIngredientsAdded(arrayToAdd: Ingredient[]) {
    this.ingredients.push(...arrayToAdd);
    this.ingredients = this.checkSimilarIngredients(this.getShopList());
    this.OnAddIngredient.next(this.getShopList());
    console.log(this.ingredients);
  }

  ingredientsListClear() {
    let ensure = confirm('Are you sure you want to clear the list (it will delete all the ingredients from it)?');
    if(ensure) {
      this.ingredients.splice(0, this.ingredients.length);
      this.OnAddIngredient.next(this.getShopList());
    }
  }
}