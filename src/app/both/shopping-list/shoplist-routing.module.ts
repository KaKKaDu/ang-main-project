
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoplistRoutes: Routes = [
  { path:'', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(shoplistRoutes)],
  exports: [RouterModule]
})

export class ShoplistRoutingModule {

}