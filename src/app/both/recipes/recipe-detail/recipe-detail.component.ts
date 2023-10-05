import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/both/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FireBaseService } from 'src/app/shared/server-interaction/firebase.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipeDetails:Recipe;
  manageAvailable: boolean = false;

  constructor(private shoppingListService: ShoppingListService, private recipesService: RecipesService, private route: ActivatedRoute, private router: Router, private fireBaseService: FireBaseService) {

  }

  ngOnInit(): void {
    console.log('hey');
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
    console.log(this.recipeDetails.ingredients);
    const arrayToSpread: Ingredient[] = this.recipeDetails.ingredients.slice();
    this.shoppingListService.arrayOfIngredientsAdded(arrayToSpread.slice());
    console.log(this.recipeDetails.ingredients);
    this.fireBaseService.savingFireBaseData();
  }

  onDeleteRecipe() {
    let ensure = confirm('Are you sure you want delete this recipe?');
    if(ensure) {
      let index = this.recipesService.findRecipeIndex(this.recipeDetails.name);
      this.recipesService.deleteRecipe(index);
      this.router.navigate(['/recipes']);
      this.fireBaseService.savingFireBaseData();
    }
  }
}
