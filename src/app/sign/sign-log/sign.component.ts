
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { SignService } from '../sign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from 'src/app/shared/server-interaction/firebase.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent implements OnInit{

  signUpForm: FormGroup;
  passwordCovered: boolean = true;
  newAccount: boolean;
  signedIn: boolean;
  userToken: string | null;
  loading: boolean = false;

  eye = faEyeSlash;

  constructor(
    private signService: SignService,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FireBaseService) {}

  ngOnInit(): void {
    this.signService.gotUserToken.subscribe(
      (bool) => {
        this.loading = false;
      }
    )

    this.route.params.subscribe(
      (params) => {
        if(params['sign'] === 'sign-up') {
          this.newAccount = true;
        } else if (params['sign'] === 'log-in') {
          this.newAccount = false;
        }
      }
    )

    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    const signEmail:string = this.signUpForm.controls['email'].value;
    const signPassword:string = this.signUpForm.controls['password'].value;
    if(this.newAccount) {
      this.signService.signUp(signEmail, signPassword);
    } else if(!this.newAccount) {
      this.signService.signIn(signEmail, signPassword);
    }
    this.signUpForm.reset();
    this.loading = true;
  }

  changePassType() {
    this.passwordCovered = !this.passwordCovered;
  }
}
