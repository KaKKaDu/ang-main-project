
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "src/app/shared/modules-shared/share.module";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesStartComponent,
    EditRecipeComponent,
  ],
  imports: [
    RecipesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ShareModule
  ],
  exports: [
    RecipesComponent
  ]
})

export class RecipesModule {

}