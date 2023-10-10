
import { NgModule } from "@angular/core";
import { ShareModule } from "src/app/shared/modules-shared/share.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoplistRoutingModule } from "./shoplist-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    FormsModule,
    ShareModule,
    ReactiveFormsModule,
    ShoplistRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    ShoppingListComponent
  ]
})

export class ShoplistModule {

}