import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginProgress = false;
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly snack: MatSnackBar,
              private readonly httpClient: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.nullValidator, Validators.required]],
      email: ['', [Validators.nullValidator, Validators.required]],
      fullname: ['', [Validators.nullValidator, Validators.required]],
      password: ['', [Validators.nullValidator, Validators.required]]
    })
  }

  signup(){
    this.loginProgress = true;
      this.httpClient.post(environment.serverUrl+'/users', this.loginForm.value, {
        headers: {
          "X-Parse-Application-Id": "folioapp"
        }
      }).subscribe(value=>{
        console.log(value);
        this.loginProgress=false;
        // @ts-ignore
        this.snack.open('Welcome, ' + value.fullname, 'Ok', {
          duration: 2000
        });
      }, error=>{
        console.log(error);
        this.loginProgress=false;
        this.snack.open(error.error.error, 'Ok', {
          duration: 2000
        });
      });
  }

}
