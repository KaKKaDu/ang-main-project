import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './both/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './both/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './both/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './both/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './both/recipes/recipes.component';
import {RecipeDetailComponent} from './both/recipes/recipe-detail/recipe-detail.component'
import { dropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './both/shopping-list/shopping-list.service';
import { BothComponent } from './both/both.component';
import { NotFoundComponent } from './both/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipesStartComponent } from './both/recipes/recipes-start/recipes-start.component';
import { EditRecipeComponent } from './both/recipes/edit-recipe/edit-recipe.component';
import { RecipesService } from './both/recipes/recipes.service';
import { HttpClientModule } from '@angular/common/http';
import { FireBaseService } from './shared/server-interaction/firebase.service';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment.development';
import { SignService } from './sign/sign.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeDetailComponent,
    dropdownDirective,
    BothComponent,
    NotFoundComponent,
    RecipesStartComponent,
    EditRecipeComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBGj49-L7CM4B2DLsA286Im8n3lnzi4JmI",
      authDomain: "main-ang-project.firebaseapp.com",
      databaseURL: "https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "main-ang-project",
      storageBucket: "main-ang-project.appspot.com",
      messagingSenderId: "542930075159",
      appId: "1:542930075159:web:8590abd039a3bb9452a652"
    }),
    AngularFireAuthModule
  ],
  providers: [ShoppingListService, RecipesService, FireBaseService, SignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
