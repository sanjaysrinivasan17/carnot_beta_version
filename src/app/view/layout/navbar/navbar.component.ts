import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<true> = new EventEmitter();
  public lastname: any;
  public firstname: any;
  public firstletter: any;
  token_based_logo: any;
  token_logo: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token_logo = localStorage.getItem("token");
    if(this.token_logo == '01df11c9ed93294a50c84389ba52f2eb05ffddd4' || this.token_logo == 'e29841efad583127cdaca516319e51a3bdbf9138' || this.token_logo == 'db91ec88d216137757f3888422781b2abbdafa73' || this.token_logo == '95b5d07787e98a3b2076087d82214747a9e98b13' || this.token_logo == 'b3dd5bde5006a1a7859a7138a9ecf515bb2321f4' || this.token_logo == '22027067c5ed2c229926d7d2d222299feae3405f'  || this.token_logo == 'a920004c82f26dec85fca5bb950bf2b5a9301458'){
      this.token_based_logo = "other";
    }else{
      this.token_based_logo = "new";
    }
    this.firstname = localStorage.getItem("firstname");
    this.lastname = localStorage.getItem("lastname");
    this.firstletter = this.firstname.substring(0, 1)
    // alert(this.firstletter)
  }

  logout() {
    // alert(localStorage.token)
    localStorage.clear();
    // alert(localStorage.token)
    if (localStorage['token'] == undefined) {
      this.router.navigate(["/auth/login"])
    }
  }
  public openSidebar() {
    this.toggleSidebar.emit();
  }
  public gotomyprofile() {
    this.router.navigate(['app/myprofile'])
  }
  public gotomanageuser() {
    this.router.navigate(['app/manageuser'])
  }
}
