import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSCI571-HW8';
  isSearchActive = true;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.router.url === '/search') {
        this.isSearchActive = true;
      } else if (this.router.url === '/favorites') {
        this.isSearchActive = false;
      }
    });
  }

  fav_border(){
    const search_button = document.querySelector('#search') as HTMLButtonElement;
    search_button.classList.remove('border-white'); 
    const fav_button = document.querySelector('#fav') as HTMLButtonElement;
    fav_button.classList.add('border-white');
  }

  search_border(){
    const fav_button = document.querySelector('#fav') as HTMLButtonElement;
    fav_button.classList.remove('border-white');
    const search_button = document.querySelector('#search') as HTMLButtonElement;
    search_button.classList.add('border-white');
  }
}
