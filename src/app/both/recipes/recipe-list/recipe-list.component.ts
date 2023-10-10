
import { RecipesService } from '../recipes.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent implements OnInit, OnDestroy {  
  recipes: Recipe[];
  recipeChangeSub: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();

    this.recipeChangeSub = this.recipesService.recipeChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}
