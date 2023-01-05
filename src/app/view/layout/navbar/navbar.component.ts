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
    if(this.token_logo == '01df11c9ed93294a50c84389ba52f2eb05ffddd4' || this.token_logo == 'e29841efad583127cdaca516319e51a3bdbf9138'){
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
    // alert(localStorage['token'])
    localStorage.clear();
    // alert(localStorage['token'])
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
