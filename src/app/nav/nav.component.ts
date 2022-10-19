import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { signOut, getAuth, Auth } from 'firebase/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated = false
  private afAuth = getAuth()

  constructor(
    public modal: ModalService,
    public auth: AuthService) {
      this.auth.isAuthenticated$.subscribe(status => {
        this.isAuthenticated = status 
        console.log(this.isAuthenticated)
      })
     }

  ngOnInit(): void {
  }

  openModal($event:Event){
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }



}
