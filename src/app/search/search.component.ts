import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as geohash from 'ngeohash';
import { FormControl } from '@angular/forms';
import { style } from '@angular/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ElementRef, ViewChild } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

const API_KEY = "e8067b53"



declare const require: any;
interface Option {
  name: string;
  value: string;
}


interface Attraction {
  name: string;
  id: string;
}


interface GeocodingApiResult {  /*Tutorialspoint*/
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }[]
}


interface eventsData {
  _embedded: {
    events: Array<{
      dates: {
        start: {
          localDate: string;
          localTime: string;
        }
      },
    }>
  },
}


interface Event_Data {
  classifications: any[];
  dates: any;
  id: string;
  images: any[];
  locale: string;
  name: string;
  outlets: any[];
  sales: any;
  seatmap: any;
  priceRanges: any[];
  test: boolean;
  type: string;
  url: string;
  _embedded: any;
  _links: any;
  
}



interface Venue_Data{
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  _embedded: {
    venues: {
      generalInfo:{
        childRule: any;
        generalRule: any;
      }
      city:{
        name: string;
      }
      name: string;
      boxOfficeInfo:{
        phoneNumberDetail: any
        openHoursDetail: any
      }
      postalCode: string
      state:{
        stateCode: string
      }
      address: {
        line1: string
      }
    }[]
  };
  _links: {
    self: {

    }
  };
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})



export class SearchComponent implements OnInit {

// update
searchMoviesCtrl = new FormControl();
filteredMovies: any;
isLoading = false;
errorMsg!: string;
minLengthTerm = 1;
keyword: any = "";

onSelected() {
  console.log(this.keyword);
  this.keyword = this.keyword;
}

displayWith(value: any) {
  return value;
}



IsValid(): boolean {   // reference - stackoverflow
  const bcd = document.getElementById('my-form') as HTMLFormElement;
  if (bcd.checkValidity()) {
    return true;
  } else {
    bcd.reportValidity();
    return false;
  }
}


// update

strr2 = ""



event_2_data = { id: null, name: null, venue: null, date: null, genre: null};
isLiked = false;

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('likedEvents') || '[]');

    // update
    this.searchMoviesCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        // onst url_13 = `http://localhost:5000/api/spotifyAlbums?${queryParams12}`;
        //         this.artistsData_albums = []
        //         this.http.get(url_13).subscribe({
        switchMap(value => this.http.get('/api/dynamic?keywordss='+value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['_embedded'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data['_embedded']['attractions'];
        }
        console.log(this.filteredMovies);
        console.log(data)
      });
  }
    // update


  

  toggleLike() {
    this.isLiked = !this.isLiked;
    if(this.isLiked){
      alert("Event added to favorites")
    }
    if(!this.isLiked){
      alert("Event removed from favorites")
    }
    const data2 = JSON.parse(localStorage.getItem('likedEvents') || '[]');
    if (this.isLiked && !data2.includes(this.event_data.id)) {
      var strr = "";
      var counter = 0;
      if(this.event_data['classifications'][0]?.subGenre?.name !== undefined && this.event_data['classifications'][0]?.subGenre?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          strr += this.event_data['classifications'][0]?.subGenre?.name
        }
      }
      if(this.event_data['classifications'][0]?.genre?.name !== undefined && this.event_data['classifications'][0]?.genre?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          strr += this.event_data['classifications'][0]?.genre?.name
        }
        else{
          strr += " | "
          strr += this.event_data['classifications'][0]?.genre?.name
        }
      }
      if(this.event_data['classifications'][0]?.segment?.name !== undefined && this.event_data['classifications'][0]?.segment?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          strr += this.event_data['classifications'][0]?.segment?.name
        }
        else{
          strr += " | "
          strr += this.event_data['classifications'][0]?.segment?.name
        }
      }
      if(this.event_data['classifications'][0]?.subType?.name !== undefined && this.event_data['classifications'][0]?.subType?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          strr += this.event_data['classifications'][0]?.subType?.name
        }
        else{
          strr += " | "
          strr += this.event_data['classifications'][0]?.subType?.name
        }
      }
      if(this.event_data['classifications'][0]?.type?.name !== undefined && this.event_data['classifications'][0]?.type?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          strr += this.event_data['classifications'][0]?.type?.name
        }
        else{
          strr += " | "
          strr += this.event_data['classifications'][0]?.type?.name
        }
      }
      const event_Data = { id: this.event_data.id ,name: this.event_data.name, venue: this.event_data['_embedded']['venues'][0]['name'], date: this.event_data['dates']['start']['localDate'], genre:strr };
      data2.push(event_Data);
      localStorage.setItem('likedEvents', JSON.stringify(data2));
    } else if (!this.isLiked && data2.some((event: any) => event.id === this.event_data.id)) {
      const newData = data2.filter((event: any) => event.name !== this.event_data.name);
      localStorage.setItem('likedEvents', JSON.stringify(newData));
    }
  }
  

public latt: number = 1
public longg: number = 1
public artistsData: any = []; 
public artistsData_albums: any = []; 


mapOptions: google.maps.MapOptions = {
  center: { lat: this.latt, lng: this.longg },
  zoom : 14
}
marker = {
  position: { lat: this.latt, lng: this.longg },
}

@ViewChild('classificationSpan') classificationSpans!: QueryList<ElementRef>;
  countDisplayedSpans(): number {
    let count = 0;
    this.classificationSpans.forEach(span => {
      if (span.nativeElement.offsetParent !== null) {
        count++;
      }
    });
    return count;
  } 

  @ViewChild('textContainer') textContainer!: ElementRef;
  @ViewChild('textContainer2') textContainer2!: ElementRef;
  @ViewChild('textContainer3') textContainer3!: ElementRef;
  isExpanded = false;
  isExpanded2 = false;
  isExpanded3 = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.textContainer.nativeElement.style.webkitLineClamp = 'unset';
    } else {
      this.textContainer.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
    }
  }
  toggleExpansion2() {
    this.isExpanded2 = !this.isExpanded2;
    if (this.isExpanded2) {
      this.textContainer2.nativeElement.style.webkitLineClamp = 'unset';
    } else {
      this.textContainer2.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
    }
  }
 
  toggleExpansion3() {
    this.isExpanded3 = !this.isExpanded3;
    if (this.isExpanded3) {
      this.textContainer3.nativeElement.style.webkitLineClamp = 'unset';
    } else {
      this.textContainer3.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
    }
  }

  

    center: any;
    input_yorno: boolean = false;
    distance: number = 10;
    location: string = '';
    selected_cat: string = 'Default';
    data: { [key: string]: any }[] = [];
    showTable: boolean = false;
    event_details_var: boolean = false;
    event_data!: Event_Data
    venue_data!: Venue_Data
    show_dandi = 0
    isChecked = false;
    progressValue = 70;
    data_empty: boolean = false;
    isInputRequired = true;
    isInputRequired2 = true;
   
disable_loc(): void {
  this.location = ''
  this.input_yorno = !this.input_yorno   /*cloud hadoop*/
}

  constructor(private http: HttpClient) { 
  }
  
clear(){
  this.keyword = ''
  this.distance = 10
  this.location = ""
  console.log(this.selected_cat)
  this.selected_cat = 'Default'
  this.event_details_var = false
  this.showTable = false
  this.input_yorno = false;
  this.isChecked = false;
  this.data_empty = false;
  this.filteredMovies = [];
  this.isInputRequired = false;
  this.isInputRequired2 = false;
}

onSubmit() {
this.isInputRequired = true;
this.isInputRequired2 = true;
var keyword_input = document.getElementById('keyy') as HTMLFormElement
if (this.IsValid()){
  this.show_dandi = 0
  this.event_details_var = false
  if(this.input_yorno == true){
    const ipinfo_url = 'https://ipinfo.io/?token=3261999ed827bf'
    this.http.get<{ loc: string }>(ipinfo_url).subscribe({
      next: (response) => {
        var ip_info = response
        var geohash = require('ngeohash');
        const ipinfo = ip_info.loc 
        var latitude_ip = ipinfo.substring(0,ipinfo.indexOf(","));
        var longitude_ip = ipinfo.substring(ipinfo.indexOf(",")+1)
        var Geohashh = geohash.encode(latitude_ip, longitude_ip)
        console.log(Geohashh)
        console.log(this.selected_cat)
        const queryParams = `keyword=${this.keyword}&distance=${this.distance}&location=${Geohashh}&selected_cat=${this.selected_cat}`;
        const url = `/api/form?${queryParams}`;
        this.http.get<eventsData>(url).subscribe({
          next: (response) => {
            if(response?._embedded?.events){
              this.data = response._embedded.events.sort((a, b) => {
                const dateA = new Date(a.dates.start.localDate + 'T' + a.dates.start.localTime);
                const dateB = new Date(b.dates.start.localDate + 'T' + b.dates.start.localTime);
                return dateA.getTime() - dateB.getTime();
              });
              this.showTable = true;
            }
            else{
              this.data_empty = true
              console.log(this.data_empty)
              this.showTable = false
            }
            if(response?._embedded?.events.length>0){
              this.data_empty = false
            }
            console.log(this.data)
            console.log("Client Side",response)
          },
          error: (error) => {
            console.log(error);
          }
        });

        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  if(this.input_yorno == false){
    var geolocation_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.location+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'
    this.http.get<GeocodingApiResult>(geolocation_url).subscribe({
      next: (response) => {
      if(response?.results[0]?.geometry?.location?.lat){
      this.data_empty = false
      var lat = response['results'][0]['geometry']['location']['lat'];
      var long = response['results'][0]['geometry']['location']['lng'];
      var geohash = require('ngeohash');
      var Geohashh = geohash.encode(lat, long)
      console.log(Geohashh)
      const queryParams = `keyword=${this.keyword}&distance=${this.distance}&location=${Geohashh}&selected_cat=${this.selected_cat}`;
      const url = `/api/form?${queryParams}`;
      this.http.get<eventsData>(url).subscribe({
        next: (response) => {
          if(response?._embedded?.events){
            this.data = response._embedded.events.sort((a, b) => {
              const dateA = new Date(a.dates.start.localDate + 'T' + a.dates.start.localTime);
              const dateB = new Date(b.dates.start.localDate + 'T' + b.dates.start.localTime);
              return dateA.getTime() - dateB.getTime();
            });
            this.showTable = true;
          }
            if(this.data.length==0){
              this.data_empty = true
              this.showTable = false
              console.log(this.data_empty)
            }
            if(this.data.length>0){
              this.data_empty = false
            }
          console.log(this.data)
          console.log("Client Side",response)
        },
        error: (error) => {
          console.log(error);
        }
      });
      }
      else{
        this.data_empty = true
      }
      
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
}
}

event_details(event_id: string){
  this.isExpanded = false;
  this.isExpanded2 = false;
  this.isExpanded3 = false;
  this.show_dandi = 1
  this.showTable = false;
  console.log(event_id)
  const queryParams2 = `event_id=${event_id}`;
  const queryParams3 = `event_id=${event_id}`;
  const url_event = `/api/event?${queryParams2}`;
  const data5 = JSON.parse(localStorage.getItem('likedEvents') || '[]');
  console.log(data5)
  if (data5.some((event: any) => event.id === event_id)) {
    this.isLiked = true;
    console.log("Hello")
  }
  else{
    this.isLiked = false;
    console.log("Nallo")
  }

  this.http.get(url_event).subscribe({
    next: (response) => {
      var i=0
      this.event_data = response as Event_Data;
      //update
      // const elements = document.querySelectorAll('.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab-indicator__content--underline, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-focus-indicator::before');

      // elements.forEach((element: Element) => {
      //   (element as HTMLElement).style.borderColor = '';
      // });
      //update

      var counter = 0
      this.strr2 = ""
      if(this.event_data['classifications'][0]?.subGenre?.name !== undefined && this.event_data['classifications'][0]?.subGenre?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          this.strr2 += this.event_data['classifications'][0]?.subGenre?.name
        }
      }
      if(this.event_data['classifications'][0]?.genre?.name !== undefined && this.event_data['classifications'][0]?.genre?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          this.strr2 += this.event_data['classifications'][0]?.genre?.name
        }
        else{
          this.strr2 += " | "
          this.strr2 += this.event_data['classifications'][0]?.genre?.name
        }
      }
      if(this.event_data['classifications'][0]?.segment?.name !== undefined && this.event_data['classifications'][0]?.segment?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          this.strr2 += this.event_data['classifications'][0]?.segment?.name
        }
        else{
          this.strr2 += " | "
          this.strr2 += this.event_data['classifications'][0]?.segment?.name
        }
      }
      if(this.event_data['classifications'][0]?.subType?.name !== undefined && this.event_data['classifications'][0]?.subType?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          this.strr2 += this.event_data['classifications'][0]?.subType?.name
        }
        else{
          this.strr2 += " | "
          this.strr2 += this.event_data['classifications'][0]?.subType?.name
        }
      }
      if(this.event_data['classifications'][0]?.type?.name !== undefined && this.event_data['classifications'][0]?.type?.name !== 'Undefined'){
        counter = counter + 1
        if(counter == 1){
          this.strr2 += this.event_data['classifications'][0]?.type?.name
        }
        else{
          this.strr2 += " | "
          this.strr2 += this.event_data['classifications'][0]?.type?.name
        }
      }
      
      if(this.event_data['classifications'][0]?.segment?.name == "Music"){
        console.log("Music ka bandha",this.event_data['classifications'][0]?.segment?.name)
        if(this.event_data['_embedded']['attractions']){
          for(i=0;i<this.event_data['_embedded']['attractions'].length;i++){
            const queryParams10 = `artist_name=${this.event_data['_embedded']['attractions'][i]['name']}`;
            const url_9 = `/api/spotify?${queryParams10}`;
            this.artistsData = []
            this.http.get(url_9).subscribe({
              next: (response: any) => {
                console.log("Client Side, Artist name",response)
                this.artistsData.push(response);
                var response_data = response
                const queryParams12 = `artist_id=${response_data['artists']['items'][0]['id']}`;
                const url_13 = `/api/spotifyAlbums?${queryParams12}`;
                this.artistsData_albums = []
                this.http.get(url_13).subscribe({
                  next: (response) => {
                    console.log("Client Side, Albums_Artist",response)
                    this.artistsData_albums.push(response);
                    console.log("ALL ALBUMS ARTIST DATA",this.artistsData_albums)
                  },
                  error: (error) => {
                    console.log(error);
                  }
            });
                console.log("ALL ARTIST DATA",this.artistsData)
                console.log("ALL ALBUMS ARTIST DATA",this.artistsData_albums)
                
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
        }
        // for(i=0;i<this.event_data['_embedded']['attractions'].length;i++){
        //   const queryParams12 = `artist_id=${this.artistsData[0]['artists']['items'][0]['id']}`;
        //   const url_13 = `http://localhost:5000/api/spotifyAlbums?${queryParams12}`;
        //   this.artistsData_albums = []
        //   this.http.get(url_13).subscribe({
        //     next: (response) => {
        //       console.log("Client Side, Albums_Artist",response)
        //       // this.artistsData.push(response);
        //       // console.log("ALL ARTIST DATA",this.artistsData)
        //     },
        //     error: (error) => {
        //       console.log(error);
        //     }
        //   });
        // }
        
      }
      console.log("Client Side (Event-Details)",response)
      console.log("venue toh dekho",this.event_data['_embedded']['venues'][0]['name'] )
      const queryParams3 = `venue_name=${this.event_data['_embedded']['venues'][0]['name']}`;
      const venue_url = `/api/venue?${queryParams3}`;
      this.http.get(venue_url).subscribe({
        next: (response) => {
          console.log("Client Side - Venue Response",response)
          this.venue_data = response as Venue_Data;

          if(this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1){
            console.log(this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1)
            var geolocation_url_2 = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'
            this.http.get<GeocodingApiResult>(geolocation_url_2).subscribe({
              next: (response) => {
                if(response?.results?.[0]?.geometry?.location?.lat){
                  this.latt = response['results'][0]['geometry']['location']['lat'];
                this.longg = response['results'][0]['geometry']['location']['lng'];
                console.log(this.latt, this.longg);

                this.mapOptions = {
                  center: { lat: this.latt, lng: this.longg },
                  zoom : 14
                }
                this.marker = {
                  position: { lat: this.latt, lng: this.longg },
                }
                }
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
         
          
          const element = document.querySelector('.map-container') as HTMLElement;
          element.style.width = '';
          element.style.height = '360px';
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.event_details_var = true;
    },
    error: (error) => {
      console.log(error);
    }
  });
}

replace_pipe (name : string){
  let myString = name.replace(/\|/g, "");
  return myString;
}


switch_back(){
  this.event_details_var = false;
  this.showTable = true;
}
}
