import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FireBaseService } from './shared/server-interaction/firebase.service';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit {
  title = 'Project';

  constructor(private fireBaseService: FireBaseService) {}

  ngOnInit(): void {
    console.log('intiated!');
    this.fireBaseService.fetchingFireBaseData();
    const config = {
      apiKey: "AIzaSyBGj49-L7CM4B2DLsA286Im8n3lnzi4JmI",
      authDomain: "main-ang-project.firebaseapp.com",
      databaseURL: "https://main-ang-project-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "main-ang-project",
      storageBucket: "main-ang-project.appspot.com",
      messagingSenderId: "542930075159",
      appId: "1:542930075159:web:8590abd039a3bb9452a652"
    }
    initializeApp(config)
  }
}
