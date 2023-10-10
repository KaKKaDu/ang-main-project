
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from './shared/modules-shared/share.module';

import { BothModule } from './both/both.module';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { SignModule } from './sign/sign.module';
import { SignRoutingModule } from './sign/sign-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './both/shopping-list/shopping-list.service';
import { RecipesService } from './both/recipes/recipes.service';
import { FireBaseService } from './shared/server-interaction/firebase.service';
import { SignService } from './sign/sign.service';

import { environment } from 'src/environments/environment.development';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, 
    BothModule,
    SignModule,
    SignRoutingModule,
    FontAwesomeModule,
    ShareModule,
    WildcardRoutingModule,
  ],
  providers: [ShoppingListService, RecipesService, FireBaseService, SignService],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}
