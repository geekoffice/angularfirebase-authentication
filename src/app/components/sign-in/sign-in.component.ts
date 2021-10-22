import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import * as firebase from "firebase";
import { AngularFireAuth } from '@angular/fire/auth';

declare var window: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit, AfterViewInit {
  showPhoneSignIn = false;
  showPhoneOTP = false;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() { }

  async ngAfterViewInit() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('recaptcha solved', response);
      }
    }, await this.afAuth.app);
  }

  signInWithPhone(phone: string) {
    this.authService.RequestOTP(phone);
    this.showPhoneOTP = true;
  }
}
