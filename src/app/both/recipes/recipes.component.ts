
import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})

export class RecipesComponent implements OnInit {
  onlyRecipes:boolean = false;

  constructor(
    private recipesService: RecipesService,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    if(this.route.parent?.routeConfig?.path === 'recipes') {
      this.onlyRecipes = true;
    } else {
      this.onlyRecipes = false;
    }
  }
}
