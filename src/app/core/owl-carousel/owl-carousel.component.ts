import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-owl-carousel',
    templateUrl: './owl-carousel.component.html',
    styleUrls: ['./owl-carousel.component.scss']
})
export class OwlCarouselComponent implements OnInit {

    customOptions: any = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ["<img src='../../../assets/images/back.svg'>","<img src='../../../assets/images/back.svg'>"],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
        nav: true
    }

    constructor() {
    }

    ngOnInit() {
    }

}
