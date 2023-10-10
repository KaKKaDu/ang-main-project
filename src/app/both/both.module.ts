

import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BothRoutingModule } from "./both-routing.module";
import { ShareModule } from "../shared/modules-shared/share.module";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoplistModule } from "./shopping-list/shoplist.module";

import { BothComponent } from "./both.component";
import { NotFoundComponent } from "./not-found/not-found.component";


@NgModule({
  declarations: [
    BothComponent,
    NotFoundComponent,
  ],
  imports: [
    BothRoutingModule,
    RecipesModule,
    FontAwesomeModule,
    ShoplistModule,
    ShareModule
  ]
})

export class BothModule {

}