
import { Component } from '@angular/core';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.css', '../../../shared/css-shared/filler-styles.css']
})

export class RecipesStartComponent {
  meal = faPlateWheat;
}
