import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../../map-section/services-map/http.service";


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ChangedDate: any;
  public Mapiconvisibility: any;

  constructor(private _http: HttpService,private router: Router) {
    this._http.getNewMapIcon().subscribe(info => {
      this.ChangedDate = info;
      this.Mapiconvisibility = this.ChangedDate.dateval
      // alert(this.Mapiconvisibility)
    })
   }

  public ngOnInit(): void { }

  logout() {
    // alert(localStorage.token)
    localStorage.clear();
    // alert(localStorage.token)
    if (localStorage['token'] == undefined) {
      this.router.navigate(["/auth/login"])
    }
  }

}
