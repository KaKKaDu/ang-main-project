
import { NgModule } from "@angular/core";
import { SignComponent } from "./sign-log/sign.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../shared/modules-shared/share.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SignRoutingModule } from "./sign-routing.module";


@NgModule({
  declarations: [
    SignComponent
  ],
  imports: [
    ReactiveFormsModule,
    ShareModule,
    FontAwesomeModule,
    SignRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [],
})

export class SignModule {

}