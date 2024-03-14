// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as geohash from 'ngeohash';
// import { style } from '@angular/animations';
// import { MatTabsModule } from '@angular/material/tabs';
// import { ElementRef, ViewChild } from '@angular/core';
// import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';



// declare const require: any;


// interface Attraction {
//   name: string;
//   id: string;
// }


// interface GeocodingApiResult {  /*Tutorialspoint*/
//   results: {
//     geometry: {
//       location: {
//         lat: number;
//         lng: number;
//       }
//     }
//   }[]
// }


// interface eventsData {
//   _embedded: {
//     events: Array<{
      
//     }>
//   },
// }

// interface Event_Data {
//   classifications: any[];
//   dates: any;
//   id: string;
//   images: any[];
//   locale: string;
//   name: string;
//   outlets: any[];
//   sales: any;
//   seatmap: any;
//   priceRanges: any[];
//   test: boolean;
//   type: string;
//   url: string;
//   _embedded: any;
//   _links: any;
  
// }



// interface Venue_Data{
//   size: number;
//   totalElements: number;
//   totalPages: number;
//   number: number;
//   _embedded: {
//     venues: {
//       generalInfo:{
//         childRule: any;
//         generalRule: any;
//       }
//       city:{
//         name: string;
//       }
//       name: string;
//       boxOfficeInfo:{
//         phoneNumberDetail: any
//         openHoursDetail: any
//       }
//       postalCode: string
//       state:{
//         stateCode: string
//       }
//       address: {
//         line1: string
//       }
//     }[]
//   };
//   _links: {
//     self: {

//     }
//   };
// }

// @Component({
//   selector: 'app-component1',
//   templateUrl: './component1.component.html',
//   styleUrls: ['./component1.component.css']
// })


// export class Component1Component {    
// public latt: number = 1
// public longg: number = 1
// public artistsData: any = []; 
// public artistsData_albums: any = []; 


// mapOptions: google.maps.MapOptions = {
//   center: { lat: this.latt, lng: this.longg },
//   zoom : 14
// }
// marker = {
//   position: { lat: this.latt, lng: this.longg },
// }

// @ViewChild('classificationSpan') classificationSpans!: QueryList<ElementRef>;
//   countDisplayedSpans(): number {
//     let count = 0;
//     this.classificationSpans.forEach(span => {
//       if (span.nativeElement.offsetParent !== null) {
//         count++;
//       }
//     });
//     return count;
//   } 

//   @ViewChild('textContainer') textContainer!: ElementRef;
//   @ViewChild('textContainer2') textContainer2!: ElementRef;
//   @ViewChild('textContainer3') textContainer3!: ElementRef;
//   isExpanded = false;
//   isExpanded2 = false;
//   isExpanded3 = false;

//   toggleExpansion() {
//     this.isExpanded = !this.isExpanded;
//     if (this.isExpanded) {
//       this.textContainer.nativeElement.style.webkitLineClamp = 'unset';
//     } else {
//       this.textContainer.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
//     }
//   }
//   toggleExpansion2() {
//     this.isExpanded2 = !this.isExpanded2;
//     if (this.isExpanded2) {
//       this.textContainer2.nativeElement.style.webkitLineClamp = 'unset';
//     } else {
//       this.textContainer2.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
//     }
//   }

//   toggleExpansion3() {
//     this.isExpanded3 = !this.isExpanded3;
//     if (this.isExpanded3) {
//       this.textContainer3.nativeElement.style.webkitLineClamp = 'unset';
//     } else {
//       this.textContainer3.nativeElement.style.webkitLineClamp = '2'; //stackoverflow
//     }
//   }


//     center: any;
//     input_yorno: boolean = false;
//     keyword: string = '';
//     distance: number = 10;
//     location: string = '';
//     selected_cat: string = 'Default';
//     data: { [key: string]: any }[] = [];
//     showTable: boolean = false;
//     event_details_var: boolean = false;
//     event_data!: Event_Data
//     venue_data!: Venue_Data
//     show_dandi = 0
//     isChecked = false;
//     progressValue = 70;
//     data_empty: boolean = false;
   
// disable_loc(): void {
//   this.location = ''
//   this.input_yorno = !this.input_yorno   /*cloud hadoop*/
// }

//   constructor(private http: HttpClient) { 
//   }
  
// clear(){
//   this.keyword = ''
//   this.distance = 10
//   this.location = ""
//   console.log(this.selected_cat)
//   this.selected_cat = 'Default'
//   this.event_details_var = false
//   this.showTable = false
//   this.input_yorno = false;
//   this.isChecked = false;
//   this.data_empty = false;
// }

// onSubmit() {
//   this.show_dandi = 0
//   this.event_details_var = false
//   if(this.input_yorno == true){
//     const ipinfo_url = 'https://ipinfo.io/?token=3261999ed827bf'
//     this.http.get<{ loc: string }>(ipinfo_url).subscribe({
//       next: (response) => {
//         var ip_info = response
//         var geohash = require('ngeohash');
//         const ipinfo = ip_info.loc
//         var latitude_ip = ipinfo.substring(0,ipinfo.indexOf(","));
//         var longitude_ip = ipinfo.substring(ipinfo.indexOf(",")+1)
//         var Geohashh = geohash.encode(latitude_ip, longitude_ip)
//         console.log(Geohashh)
//         const queryParams = `keyword=${this.keyword}&distance=${this.distance}&location=${Geohashh}&selected_cat=${this.selected_cat}`;
//         const url = `http://localhost:5000/api/form?${queryParams}`;
//         this.http.get<eventsData>(url).subscribe({
//           next: (response) => {
//             if(response?._embedded?.events){
//               this.data = response._embedded.events;
//               this.showTable = true;
//             }
//             else{
//               this.data_empty = true
//               console.log(this.data_empty)
//               this.showTable = false
//             }
//             if(response?._embedded?.events.length>0){
//               this.data_empty = false
//             }
//             console.log(this.data)
//             console.log("Client Side",response)
//           },
//           error: (error) => {
//             console.log(error);
//           }
//         });

        
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//   }
//   if(this.input_yorno == false){
//     var geolocation_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.location+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'
//     this.http.get<GeocodingApiResult>(geolocation_url).subscribe({
//       next: (response) => {
//       if(response?.results[0]?.geometry?.location?.lat){
//       this.data_empty = false
//       var lat = response['results'][0]['geometry']['location']['lat'];
//       var long = response['results'][0]['geometry']['location']['lng'];
//       var geohash = require('ngeohash');
//       var Geohashh = geohash.encode(lat, long)
//       console.log(Geohashh)
//       const queryParams = `keyword=${this.keyword}&distance=${this.distance}&location=${Geohashh}&selected_cat=${this.selected_cat}`;
//       const url = `http://localhost:5000/api/form?${queryParams}`;
//       this.http.get<eventsData>(url).subscribe({
//         next: (response) => {
//           if(response?._embedded?.events){
//             this.data = response._embedded.events;
//             this.showTable = true;
//           }
//             if(this.data.length==0){
//               this.data_empty = true
//               this.showTable = false
//               console.log(this.data_empty)
//             }
//             if(this.data.length>0){
//               this.data_empty = false
//             }
//           console.log(this.data)
//           console.log("Client Side",response)
//         },
//         error: (error) => {
//           console.log(error);
//         }
//       });
//       }
//       else{
//         this.data_empty = true
//       }
      
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//   }

  
// }

// event_details(event_id: string){
//   this.show_dandi = 1
//   this.showTable = false;
//   console.log(event_id)
//   const queryParams2 = `event_id=${event_id}`;
//   const queryParams3 = `event_id=${event_id}`;
//   const url_event = `http://localhost:5000/api/event?${queryParams2}`;


//   this.http.get(url_event).subscribe({
//     next: (response) => {
//       var i=0
//       this.event_data = response as Event_Data;
//       if(this.event_data['classifications'][0]?.segment?.name == "Music"){
//         console.log("Music ka bandha",this.event_data['classifications'][0]?.segment?.name)
//         console.log(this.event_data['_embedded']['attractions'].length)
//         console.log(this.event_data['_embedded']['attractions'])
//         console.log(this.event_data['_embedded'])
//         for(i=0;i<this.event_data['_embedded']['attractions'].length;i++){
//           const queryParams10 = `artist_name=${this.event_data['_embedded']['attractions'][i]['name']}`;
//           const url_9 = `http://localhost:5000/api/spotify?${queryParams10}`;
//           this.artistsData = []
//           this.http.get(url_9).subscribe({
//             next: (response: any) => {
//               console.log("Client Side, Artist name",response)
//               this.artistsData.push(response);
//               var response_data = response
//               const queryParams12 = `artist_id=${response_data['artists']['items'][0]['id']}`;
//               const url_13 = `http://localhost:5000/api/spotifyAlbums?${queryParams12}`;
//               this.artistsData_albums = []
//               this.http.get(url_13).subscribe({
//                 next: (response) => {
//                   console.log("Client Side, Albums_Artist",response)
//                   this.artistsData_albums.push(response);
//                   console.log("ALL ALBUMS ARTIST DATA",this.artistsData_albums)
//                 },
//                 error: (error) => {
//                   console.log(error);
//                 }
//           });
//               console.log("ALL ARTIST DATA",this.artistsData)
//               console.log("ALL ALBUMS ARTIST DATA",this.artistsData_albums)
              
//             },
//             error: (error) => {
//               console.log(error);
//             }
//           });
//         }
//         // for(i=0;i<this.event_data['_embedded']['attractions'].length;i++){
//         //   const queryParams12 = `artist_id=${this.artistsData[0]['artists']['items'][0]['id']}`;
//         //   const url_13 = `http://localhost:5000/api/spotifyAlbums?${queryParams12}`;
//         //   this.artistsData_albums = []
//         //   this.http.get(url_13).subscribe({
//         //     next: (response) => {
//         //       console.log("Client Side, Albums_Artist",response)
//         //       // this.artistsData.push(response);
//         //       // console.log("ALL ARTIST DATA",this.artistsData)
//         //     },
//         //     error: (error) => {
//         //       console.log(error);
//         //     }
//         //   });
//         // }
        
//       }
//       console.log("Client Side (Event-Details)",response)
//       console.log("venue toh dekho",this.event_data['_embedded']['venues'][0]['name'] )
//       const queryParams3 = `venue_name=${this.event_data['_embedded']['venues'][0]['name']}`;
//       const venue_url = `http://localhost:5000/api/venue?${queryParams3}`;
//       this.http.get(venue_url).subscribe({
//         next: (response) => {
//           console.log("Client Side - Venue Response",response)
//           this.venue_data = response as Venue_Data;

//           if(this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1){
//             console.log(this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1)
//             var geolocation_url_2 = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.venue_data?.['_embedded']?.venues?.[0]?.address?.line1+'&key=AIzaSyA5x3gVYXsFMVq3HlxA1_vM4jBxgNYrUa4'
//             this.http.get<GeocodingApiResult>(geolocation_url_2).subscribe({
//               next: (response) => {
//                 this.latt = response['results'][0]['geometry']['location']['lat'];
//                 this.longg = response['results'][0]['geometry']['location']['lng'];
//                 console.log(this.latt, this.longg);

//                 this.mapOptions = {
//                   center: { lat: this.latt, lng: this.longg },
//                   zoom : 14
//                 }
//                 this.marker = {
//                   position: { lat: this.latt, lng: this.longg },
//                 }
//               },
//               error: (error) => {
//                 console.log(error);
//               }
//             });
//           }
         
          
//           const element = document.querySelector('.map-container') as HTMLElement;
//           element.style.width = '';
//           element.style.height = '300px';
//         },
//         error: (error) => {
//           console.log(error);
//         }
//       });
//       this.event_details_var = true;
//     },
//     error: (error) => {
//       console.log(error);
//     }
//   });
// }

// switch_back(){
//   this.event_details_var = false;
//   this.showTable = true;
// }

// }


