
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./both/not-found/not-found.component";


const wildcardRoutes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '**',  redirectTo: '/not-found' }
]


@NgModule({
  imports: [
    RouterModule.forChild(wildcardRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class WildcardRoutingModule {

}