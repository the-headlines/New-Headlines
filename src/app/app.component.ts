import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
        // window.onload = function() {
        //     var startPos;
        //     var geoOptions = {
        //         timeout: 10 * 1000
        //     };
        //
        //     var geoSuccess = function(position) {
        //         startPos = position;
        //         console.log(position);
        //         // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        //         // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
        //     };
        //     var geoError = function(error) {
        //         console.log('Error occurred. Error code: ' + error.code);
        //         // error.code can be:
        //         //   0: unknown error
        //         //   1: permission denied
        //         //   2: position unavailable (error response from location provider)
        //         //   3: timed out
        //     };
        //
        //     navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
        // };
    }
}

