
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "../not-found/not-found.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";

const recipesRoutes: Routes = [
  { path: '', component: RecipesComponent, children: [
    {path: '', component: RecipesStartComponent},
    {path: 'new-recipe', component: EditRecipeComponent},
    {path: ':name/edit', component: EditRecipeComponent},
    {path: ':name/detail', component: RecipeDetailComponent},
    {path: 'not-found', component: NotFoundComponent}
    ] 
  },
]


@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {

}