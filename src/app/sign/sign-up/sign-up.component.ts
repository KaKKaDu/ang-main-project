import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { SignService } from '../sign.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup;
  eye = faEyeSlash;
  passwordCovered: boolean = true;

  constructor(private signService: SignService) {

  }


  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.signUpForm);
    const signEmail:string = this.signUpForm.controls['email'].value;
    const signPassword:string = this.signUpForm.controls['password'].value;
    this.signService.signUpUser(signEmail, signPassword);
  }

  changePassType() {
    this.passwordCovered = !this.passwordCovered;
  }

}
