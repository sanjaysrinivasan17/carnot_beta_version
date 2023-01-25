import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  public currentSection: string;


  constructor(
    private router: Router
  ) {
    $(document).ready(function () {
      $('#scrollToStart').click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    window.addEventListener('scroll', this.scroll, true);
  }

  public goto() {
    this.router.navigate(['auth/signup']);
  }

  public onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  public scrollToPosition(el: string) {
    const element = document.getElementById(el);
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }

  scroll = (event: any): void => {
    let previousHash: string;
    const number = event.srcElement.scrollTop;
    number > 150 ? $(".js-header-scroll").addClass("header__sticky") : $(".js-header-scroll").removeClass("header__sticky");
    number > 200 ? $(".js-back-to-top").fadeIn() : $(".js-back-to-top").fadeOut();

    $('section').each(function () {
      let hash = $(this).attr('id');
      const Scroll = $(window).scrollTop() + 1;

      if (hash) {
        if (Scroll >= $('#' + hash).offset().top) {
          if (previousHash) {
            $("#menu-" + previousHash).removeClass("active");
          }
          $("#menu-" + hash).addClass("active");
          previousHash = hash;
        } else {
          $("#menu-" + hash).removeClass("active");
        }
      }

    });

  };

  public ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
