
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { dropdownDirective } from "../dropdown.directive";


@NgModule({
  declarations: [
    dropdownDirective
  ],
  exports: [
    dropdownDirective,
    CommonModule
  ]
})

export class ShareModule {

}