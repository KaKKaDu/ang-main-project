import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { FireBaseService } from 'src/app/shared/server-interaction/firebase.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})

export class EditRecipeComponent implements OnInit{
  bordersForAmount: string = '^[1-9]+[0-9]*$';
  denyIcon = faXmark;
  editMode: boolean;
  editingRecipeName: string;
  recipeDetails: Recipe | undefined; 

  newRecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router, private fireBaseService: FireBaseService) {}

  onSubmit() {
    console.log(this.newRecipeForm);
    this.recipeDetails = {
      name: this.newRecipeForm.controls['recipeName'].value,
      imagePath: this.newRecipeForm.controls['recipeImage'].value,
      description: this.newRecipeForm.controls['recipeDescription'].value,
      ingredients: []
    }
    let formIngredients = (this.newRecipeForm.controls['recipeIngredients'] as FormArray).controls
    for(let i = 0; i< formIngredients.length; i++) {
      let ingredient: Ingredient;
      ingredient = {
        name: (formIngredients[i] as FormGroup).controls['ingredientName'].value,
        amount: (formIngredients[i] as FormGroup).controls['ingredientAmount'].value
      }
      this.recipeDetails.ingredients.push(ingredient);
    }
    if(this.editMode) {
      let index: number = this.recipesService.findRecipeIndex(this.editingRecipeName);
      this.recipesService.changeRecipe(index, this.recipeDetails);
    } else {
      this.recipesService.pushRecipe(this.recipeDetails);
    }
    this.newRecipeForm.reset();
    this.router.navigate(['/recipes', this.recipeDetails.name, 'detail']);
    this.fireBaseService.savingFireBaseData();
  } 

  getIngrControls() {
    return (<FormArray>this.newRecipeForm.get('recipeIngredients')).controls;
  }

  onAddIngredientForm() {
    let controlIngredient = new FormGroup({
      'ingredientName': new FormControl('', Validators.required),
      'ingredientAmount': new FormControl('', [Validators.required, Validators.pattern(this.bordersForAmount)])
    });
    (<FormArray>this.newRecipeForm.get('recipeIngredients')).push(controlIngredient);
  }

  onDeleteIngredientForm(index: number) {
    console.log(index);
    (<FormArray>this.newRecipeForm.get('recipeIngredients')).removeAt(index);
  }

  onCancelEditForm() {
    this.newRecipeForm.reset();
    if(this.editMode) {
      this.router.navigate(['/recipes', this.editingRecipeName, 'detail']);
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['name']) {
          this.editMode = true;
          this.editingRecipeName = params['name'].trim();
          this.recipeDetails = this.recipesService.findRecipeDetails(params['name']);
          if(this.recipeDetails) {
            this.newRecipeForm = new FormGroup({
              'recipeName': new FormControl(this.recipeDetails.name, Validators.required),
              'recipeImage': new FormControl(this.recipeDetails.imagePath),
              'recipeDescription': new FormControl(this.recipeDetails.description, Validators.required),
              'recipeIngredients': new FormArray([])
            });
  
            if(this.recipeDetails.ingredients) {
              for(let i = 0; i < this.recipeDetails.ingredients.length; i++) {
                let controlIngredient = new FormGroup({
                  'ingredientName': new FormControl(this.recipeDetails.ingredients[i].name, Validators.required),
                  'ingredientAmount': new FormControl(this.recipeDetails.ingredients[i].amount, Validators.required)
                });
                (<FormArray>this.newRecipeForm.get('recipeIngredients')).push(controlIngredient);
              }
            }  
          } else {
            this.router.navigate(['/recipes', 'not-found']);
          }
        } else {
          this.editMode = false;
          this.newRecipeForm = new FormGroup({
            'recipeName': new FormControl('', Validators.required),
            'recipeImage': new FormControl(''),
            'recipeDescription': new FormControl('New recipe!', Validators.required),
            'recipeIngredients': new FormArray([])
          });
        }  
      }
    )

  }
}
