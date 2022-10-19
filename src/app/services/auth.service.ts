import { Inject, Injectable } from '@angular/core';
import { addDoc, collection, setDoc, doc   } from "firebase/firestore"; 
import { AppModule } from 'src/app/app.module'; 
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword    } from "firebase/auth";
import IUser from "../models/user.model"
import {  } from '@firebase/auth-types';
import {  Observable, of, filter, map, switchMap } from 'rxjs';
import { signOut} from 'firebase/auth';
import { Router } from '@angular/router';
import { ActivatedRoute , NavigationEnd} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth()
  public isAuthenticated$: Observable<boolean>
  private redirect = false
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
    
  ){
    console.log(this.auth.currentUser)
    if(this.auth.currentUser === null){ 
      this.isAuthenticated$ = of(false) }else { 
        this.isAuthenticated$ = of(true)}

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of ({}))
    ).subscribe(data => {
      this.redirect = data['authOnly'] ?? false
    })

    

  }
  

  public async createUser(userData: IUser){
    const userCred = await createUserWithEmailAndPassword(
      this.auth, userData.email as string, userData.password as string
      
    )

    const docRef = await setDoc(doc(collection(AppModule.db,'users'), userCred.user.uid),{ 
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
     })

     await updateProfile(this.auth.currentUser!, {displayName: userData.name})
     this.isAuthenticated$ = of(true)

     
  }

  public async loginUser(email: string, password: string ){
    await signInWithEmailAndPassword(
      this.auth, email, password
    )

    this.isAuthenticated$ = of(true)
  }

  public async logout($event?: Event){
    if($event){
      $event.preventDefault
    }
    await signOut(this.auth)
    if (this.redirect){
      await this.router.navigateByUrl('/')
    }
    
  }


}
