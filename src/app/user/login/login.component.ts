import { Component, OnInit } from '@angular/core';
import { getAuth} from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
  alertMessage = 'please wait we are logging you in'
  alertColor = 'blue'
  inSubmition = false

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async login(){
    this.showAlert = true
    this.alertMessage = 'please wait we are logging you in'
    this.alertColor = 'blue'
    try{
      this.auth.loginUser(this.credentials.email, this.credentials.password)
    
    }catch{
      this.inSubmition = false
      this.alertMessage = 'Error'
      this.alertColor = 'Red'

      return
    }

    let currentUser = getAuth().currentUser
    console.log(currentUser)
    this.auth.isAuthenticated$.subscribe(status => {
      console.log(status)
    })
    this.alertMessage = 'Success'
    this.alertColor ='green'
  }

}
