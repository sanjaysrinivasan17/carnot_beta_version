import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.css']
})
export class VendorNavbarComponent implements OnInit {
  
  @Output() toggleSidebar: EventEmitter<true> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public openSidebar() {
    this.toggleSidebar.emit();
  }

}
