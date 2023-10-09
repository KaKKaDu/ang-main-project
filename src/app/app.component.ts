import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FireBaseService } from './shared/server-interaction/firebase.service';
import { SignService } from './sign/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit {
  title = 'Project';
  userToken: string | null;

  constructor(private fireBaseService: FireBaseService, private signService: SignService, private router: Router) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem("token");
    this.signService.gotUserToken.subscribe(
      (bool) => {
        if(bool) {
          this.userToken = localStorage.getItem("token");
        }
      }
    )
    
    if(this.userToken) {
      this.fireBaseService.fetchingFireBaseData(this.userToken);
    } else {
      console.log('Not logged in!');
    }
  }
}
