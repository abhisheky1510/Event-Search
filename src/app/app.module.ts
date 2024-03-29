import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule, 
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
