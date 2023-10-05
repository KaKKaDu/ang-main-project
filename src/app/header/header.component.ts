import { Component} from '@angular/core';
import { FireBaseService } from '../shared/server-interaction/firebase.service';
import { Recipe } from '../both/recipes/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { RecipesService } from '../both/recipes/recipes.service';
import { ShoppingListService } from '../both/shopping-list/shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private fireBaseService: FireBaseService, private recipesService: RecipesService, private shopListService: ShoppingListService, private router: Router) {

  }

  onSaveData() {
    this.fireBaseService.savingFireBaseData();
  }

  onSignIn() {
    console.log('signing in...')
  }
}
