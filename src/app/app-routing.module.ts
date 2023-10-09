import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './both/shopping-list/shopping-list.component';
import { RecipesComponent } from './both/recipes/recipes.component';
import { RecipeDetailComponent } from './both/recipes/recipe-detail/recipe-detail.component';
import { BothComponent } from './both/both.component';
import { NotFoundComponent } from './both/not-found/not-found.component';
import { RecipesStartComponent } from './both/recipes/recipes-start/recipes-start.component';
import { EditRecipeComponent } from './both/recipes/edit-recipe/edit-recipe.component';
import { SignComponent } from './sign/sign-log/sign.component';

const routes: Routes = [
  {path: '', component: BothComponent},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipesStartComponent, pathMatch: 'full'},
    {path: 'new-recipe', component: EditRecipeComponent},
    {path: ':name/edit', component: EditRecipeComponent},
    {path: ':name/detail', component: RecipeDetailComponent},
    {path: 'not-found', component: NotFoundComponent}
  ]},
  {path:'shopping-list', component: ShoppingListComponent},
  {path:':sign', component: SignComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
