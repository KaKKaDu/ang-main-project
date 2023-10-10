
import { Component, OnInit} from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  chosenLinkIndex: number | null;

  onlyShopList: boolean = false;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.shoppingListService.ProductHighlighted.subscribe(
      (num: number) => {
        this.chosenLinkIndex = null;
      }
    )
    
    if (this.route.parent?.routeConfig?.path === 'shopping-list') {
      this.onlyShopList = true;
    } else {
      this.onlyShopList = false;
    }

    this.ingredients = this.shoppingListService.getShopList(); 
    this.shoppingListService.OnAddIngredient
      .subscribe( (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onClickForEdit(index: number) {
    this.chosenLinkIndex = index;
    this.shoppingListService.ProductEdit.next(index);
  }
}
