import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';
import { FireBaseService } from 'src/app/shared/server-interaction/firebase.service';
import { SignService } from 'src/app/sign/sign.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  xmark = faXmark;

  editSubscription: Subscription;
  userToken: string | null;

  addIngredientForm: FormGroup;
  bordersForAmount: string = '^[1-9]+[0-9]*$';
  
  editingIngr: boolean = false;
  editedIngrIndex: number;
  editedIngr: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private fireBaseService: FireBaseService, private signService: SignService) {}

  ngOnInit(): void {

    this.userToken = localStorage.getItem("token");
    this.signService.gotUserToken.subscribe(
      (bool) => {
        if(bool) {
          this.userToken = localStorage.getItem("token");
        }
      }
    )

    this.editSubscription = this.shoppingListService.ProductEdit.subscribe(
      (index:number) => {
        this.editingIngr = true;
        this.editedIngrIndex = index;
        this.editedIngr = this.shoppingListService.getIngredient(index);
        this.addIngredientForm.setValue({
          'productName': this.editedIngr.name,
          'productAmount': this.editedIngr.amount
        })
      }
    )

    this.addIngredientForm = new FormGroup({
      'productName': new FormControl('', Validators.required),
      'productAmount': new FormControl('', [Validators.required, Validators.pattern(this.bordersForAmount)])
    })
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onAddIngredient() {

    console.log(this.addIngredientForm);
    this.shoppingListService.ProductHighlighted.next(1);

    const value = this.addIngredientForm.value;
    console.log(value);
    let info = new Ingredient(value.productName, value.productAmount);
    console.log(info);

    if (this.editingIngr) {
      this.shoppingListService.editIngredient(this.editedIngrIndex, info)
      this.editingIngr = false;
    } else if(!this.editingIngr) {
      this.shoppingListService.newIngredientAdded(info);
    }
    this.addIngredientForm.reset();
    if(this.userToken) {
      this.fireBaseService.savingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }

  onClearField(field:string) {
    if(field === 'name') {
      this.addIngredientForm.patchValue({
        'productName': null
      })
    } else if(field === 'amount') {
      this.addIngredientForm.patchValue({
        'productAmount': null
      })
    }
  } 

  onClearList() {
    this.shoppingListService.ingredientsListClear();
    if(this.userToken) {
      this.fireBaseService.savingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIngrIndex);
    this.editingIngr = false;
    this.addIngredientForm.reset();
    if(this.userToken) {
      this.fireBaseService.savingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }
}
