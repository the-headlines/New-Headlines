import {Component, OnInit} from '@angular/core';
import {EditInfoModalComponent} from "./modules/home/components/libs/edit-info-modal/edit-info-modal.component";
import {FeedbackComponent} from "./modules/home/pages/feedback/feedback.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private dialog: MatDialog
    ) {
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

    openDialog(term): void {
        const dialogRef = this.dialog.open(FeedbackComponent, {
            width: '500px',
            data: {
                name: term
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}

