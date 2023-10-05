import { Injectable } from "@angular/core";
import { RecipesService } from "src/app/both/recipes/recipes.service";
import { ShoppingListService } from "src/app/both/shopping-list/shopping-list.service";
import { Recipe } from "src/app/both/recipes/recipe.model";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";


@Injectable()

export class FireBaseService {

  ServerRecipeDataTrade = new Subject<Recipe[]>
  ServerShopListDataTrade = new Subject<Ingredient[]>

  constructor(private recipesService: RecipesService, private shopListService: ShoppingListService, private http: HttpClient) {

  }

  fetchingFireBaseData() {
    this.getRecipeListData().subscribe(
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

    this.getShopListData().subscribe(
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

  savingFireBaseData() {
    this.putRecipeListData().subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );

    this.putShopListData().subscribe(
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

  putRecipeListData() {
    const recipesData: Recipe[] = this.recipesService.getRecipes();
    return this.http.put('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/recipes.json', recipesData);
  }

  getRecipeListData() {
    return this.http.get<Recipe[]>('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/recipes.json');
  }

  putShopListData() {
    const shopListData: Ingredient[] = this.shopListService.getShopList();  
    return this.http.put('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/shopList.json', shopListData);
  }

  getShopListData() {
    return this.http.get<Ingredient[]>('https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app/foodData/shopList.json');
  }
}