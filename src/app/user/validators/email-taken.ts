import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
    private auth = getAuth()
    constructor(){

    }
    validate = (control: AbstractControl) : Promise<ValidationErrors | null> =>{
        return fetchSignInMethodsForEmail(this.auth, control.value).then(
            response => response.length ? { emailTaken: true} : null
        )
    }
}
