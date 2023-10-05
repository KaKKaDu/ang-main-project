
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SignService {

  constructor() {
  }

  signUpUser(email:string, password:string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password);
  }
}