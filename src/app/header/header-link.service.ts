import { part } from "../shared/models/part.model";
import { EventEmitter } from "@angular/core";


export class HeaderLinkService {

  navigationClickedEvent = new EventEmitter<{sign: part}>();

  emitChoice(choice: part) {
    let info = {sign:choice};
    this.navigationClickedEvent.emit(info);
  }
}