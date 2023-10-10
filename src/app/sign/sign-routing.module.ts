
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignComponent } from "./sign-log/sign.component";


const signRoutes: Routes = [
  {path: '', component: SignComponent}
]

@NgModule({
  imports: [RouterModule.forChild(signRoutes)],
  exports: [RouterModule]  
})

export class SignRoutingModule {

}