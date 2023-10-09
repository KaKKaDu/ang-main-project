
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { FireBaseService } from '../shared/server-interaction/firebase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SignService {

  logCheck = new Subject<boolean>(); 
  /*userToken = new Subject<string>();*/
  gotUserToken = new Subject<boolean>();
  

  token: string | undefined;

  constructor(public auth: AngularFireAuth, private firebaseService: FireBaseService, private router: Router) {

  }

  signUp(email:string, password:string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      window.alert('Registered!');
      console.log(result.user)
      result.user?.getIdToken()
        .then( (token:string) => {
          this.firebaseService.fetchingFireBaseData(token);
          /*this.userToken.next(token);
          this.token = token;*/
          console.log(token);
          localStorage.setItem("token", token);
          this.router.navigate(['/']);
          this.gotUserToken.next(true);
          let signedIn = true;
          this.logCheck.next(signedIn);
        })
      }
    ).catch((error) => {
      window.alert(error);
      let signedIn = false;
      this.logCheck.next(signedIn);
    })
  }

  signIn(email:string, password:string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result)=> {
      console.log(result);
      result.user?.getIdToken()
        .then( (token:string) => {
          this.firebaseService.fetchingFireBaseData(token);
          /*this.userToken.next(token);*/
          /*this.token = token;*/
          console.log(token);
          localStorage.setItem("token", token);
          this.router.navigate(['/']);
          this.gotUserToken.next(true);
          let signedIn = true;
          this.logCheck.next(signedIn);
        })
    })
    .catch((error) => {
      window.alert("Something went wrong. Check if you've filled all the fields correctly");
      this.gotUserToken.next(false);
      let signedIn = false;
      this.logCheck.next(signedIn);
    })
  }

  logOut() {
    return this.auth.signOut()
     .then( (result) => {
      console.log("logged out!");
      localStorage.removeItem("token");
      this.gotUserToken.next(true);
     })
     .catch( (error) => {
      window.alert(error);
     })
  }

}