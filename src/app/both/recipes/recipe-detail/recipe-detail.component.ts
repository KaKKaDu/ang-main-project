
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { FireBaseService } from 'src/app/shared/server-interaction/firebase.service';
import { ShoppingListService } from 'src/app/both/shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { SignService } from 'src/app/sign/sign.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit{
  recipeDetails:Recipe;
  manageAvailable: boolean = false;
  userToken: string | null;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private fireBaseService: FireBaseService,
    private signService: SignService) {}

  ngOnInit(): void {
    this.signService.gotUserToken.subscribe(
      (bool) => {
        if(bool) {
          this.userToken = localStorage.getItem("token");
        }
      }
    )

    this.userToken = localStorage.getItem("token");

    this.route.params.subscribe(
      (params: Params) => {
        const recipeDet = this.recipesService.findRecipeDetails(params['name'].trim());
        if(recipeDet) {
          this.recipeDetails = recipeDet;
          if(this.recipeDetails.imagePath === undefined) {
            this.recipeDetails.imagePath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Noun_Project_vegetables_icon_1422990_cc.svg/640px-Noun_Project_vegetables_icon_1422990_cc.svg.png';
          }
          console.log(this.recipeDetails);
        } else {
          this.router.navigate(['recipes', 'not-found']);
        }
      }
    )
  }

  onAddToShopList() {
    const arrayToSpread: Ingredient[] = this.recipeDetails.ingredients.slice();
    this.shoppingListService.arrayOfIngredientsAdded(arrayToSpread.slice());
    console.log(this.recipeDetails.ingredients);
    if(this.userToken) {
      this.fireBaseService.savingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }

  onDeleteRecipe() {
    let ensure = confirm('Are you sure you want delete this recipe?');
    if(ensure) {
      let index = this.recipesService.findRecipeIndex(this.recipeDetails.name);
      this.recipesService.deleteRecipe(index);
      this.router.navigate(['/recipes']);
      if(this.userToken) {
        this.fireBaseService.savingFireBaseData(this.userToken);
      } else {
        console.log("Not logged in!");
      }
    }
  }
}
