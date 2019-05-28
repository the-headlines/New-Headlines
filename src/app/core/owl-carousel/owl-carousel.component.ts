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
        navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
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
