import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-credentials',
  templateUrl: './update-credentials.component.html',
  styleUrls: ['./update-credentials.component.css']
})
export class UpdateCredentialsComponent implements OnInit {

  public updateCredentials: FormGroup;
  public showLoader: boolean = false;
  public showSuccess: boolean = false;
  
  constructor() {
    this.updateCredentials = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
   }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateCredentials.controls[controlName].hasError(errorName);
  }

  public confirmEmail() {
    this.showLoader = true;
    setTimeout(()=> {
      this.showLoader = false;
      this.showSuccess = true;
    }, 3000);
  }

}
