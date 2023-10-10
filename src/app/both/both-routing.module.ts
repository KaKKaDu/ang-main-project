
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { Routes } from "@angular/router";

import { BothComponent } from "./both.component";

const bothRoutes: Routes = [
  { path: '', component: BothComponent },
  { path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shoplist.module').then(module => module.ShoplistModule) },
  { path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule) },
] 


@NgModule({
  imports: [RouterModule.forChild(bothRoutes)],
  exports: [RouterModule] 
})

export class BothRoutingModule {

}