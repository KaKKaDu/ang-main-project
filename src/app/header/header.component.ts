import { Component, OnInit} from '@angular/core';
import { FireBaseService } from '../shared/server-interaction/firebase.service';
import { Recipe } from '../both/recipes/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { RecipesService } from '../both/recipes/recipes.service';
import { ShoppingListService } from '../both/shopping-list/shopping-list.service';
import { Router } from '@angular/router';
import { SignService } from '../sign/sign.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  signedIn: boolean;
  userToken: string | null;

  constructor(private fireBaseService: FireBaseService, private recipesService: RecipesService, private shopListService: ShoppingListService, private router: Router, private signService: SignService) {

  }

  ngOnInit(): void {
    console.log('header here!');

    this.signService.logCheck.subscribe(
      (signed: boolean) => {
        this.signedIn = signed;
      }
    )

    this.userToken = localStorage.getItem("token");
    this.signService.gotUserToken.subscribe(
      (bool) => {
        if(bool) {
          this.userToken = localStorage.getItem("token");
        }
      }
    )

    if(this.userToken) {
      this.signedIn = true;
    }
  }

  

  logOut() {
    this.signService.logOut();
    this.signedIn = false;
  }

  onSaveData() {
    if(this.userToken) {
      this.fireBaseService.savingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }
}
