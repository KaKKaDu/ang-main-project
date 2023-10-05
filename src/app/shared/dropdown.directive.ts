import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDrop]'
})

export class dropdownDirective {  
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') openToggle() {
    this.isOpened = !this.isOpened;
  }
}