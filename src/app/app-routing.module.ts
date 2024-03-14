import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavouritesComponent },
  { path: '', component: SearchComponent },
  {path: '**', redirectTo: 'search', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
