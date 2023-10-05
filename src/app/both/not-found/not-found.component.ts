import { Component } from '@angular/core';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css', '../../shared/css-shared/filler-styles.css']
})
export class NotFoundComponent {
  sadEmoji = faFaceSadTear;
}
