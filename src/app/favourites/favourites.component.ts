import { Component } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {
  likedEvents: any[] = [];

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('likedEvents') || '[]');
    this.likedEvents = data;
  }
  
  deleter(eventId: string){
    alert("Event removed from favorites")
    const newData = this.likedEvents.filter((event: any) => event.id !== eventId);
    localStorage.setItem('likedEvents', JSON.stringify(newData));
    this.likedEvents = newData;

  }
}
