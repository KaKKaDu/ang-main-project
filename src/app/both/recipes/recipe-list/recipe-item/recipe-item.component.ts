import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {

  @Input() recipe: Recipe;
  
  constructor(private recipesService: RecipesService, private router: Router) {

  }

  /*onRecipeClicked():void {
   
  }*/
}
