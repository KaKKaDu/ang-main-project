
import { Injectable } from "@angular/core";
import { RecipesService } from "src/app/both/recipes/recipes.service";
import { ShoppingListService } from "src/app/both/shopping-list/shopping-list.service";
import { Recipe } from "../models/recipe.model";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";


@Injectable()

export class FireBaseService {
  ServerRecipeDataTrade = new Subject<Recipe[]>
  ServerShopListDataTrade = new Subject<Ingredient[]>

  constructor(private recipesService: RecipesService, private shopListService: ShoppingListService, private http: HttpClient) {

  }

  fetchingFireBaseData(token: string) {
    this.getRecipeListData(token).subscribe(
      (
        {
          next: (response: Recipe[]) => {
            this.recipesService.serverDataUpdate(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    )

    this.getShopListData(token).subscribe(
      (
        {
          next: (response: Ingredient[]) => {
            this.shopListService.serverDataUpdate(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    )
  }

  savingFireBaseData(token: string) {
    this.putRecipeListData(token).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );

    this.putShopListData(token).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  putRecipeListData(token:string) {
    const recipesData: Recipe[] = this.recipesService.getRecipes();
    return this.http
      .put('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/recipes.json?auth='+token, recipesData);
  }

  getRecipeListData(token:string) {
    return this.http
      .get<Recipe[]>('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/recipes.json?auth='+token);
  }

  putShopListData(token:string) {
    const shopListData: Ingredient[] = this.shopListService.getShopList();  
    return this.http
      .put('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/shopList.json?auth='+token, shopListData);
  }

  getShopListData(token:string) {
    return this.http
      .get<Ingredient[]>('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/shopList.json?auth='+token);
  }
}