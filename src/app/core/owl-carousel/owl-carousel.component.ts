import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from '@angular/router';

@Component({
    selector: 'app-owl-carousel',
    templateUrl: './owl-carousel.component.html',
    styleUrls: ['./owl-carousel.component.scss']
})

export class OwlCarouselComponent implements OnInit {
    @Input() posts;

    routerUrl;
    postCategory;
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['<img src=\'../../../assets/images/back.svg\'>', '<img src=\'../../../assets/images/back.svg\'>'],
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
    };

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
        this.routerUrl = this.router.url;
    }


    hiddenQuestions() {
        return /road|deals|travel/i.test(this.routerUrl) || /StyleAndSweat|HumanStories|LoveDesigns/i.test(this.postCategory);
    }


    hiddenComments() {
        return /commerce/i.test(this.routerUrl) || /JumpStartups/i.test(this.postCategory);
    }

    hiddenCritics() {
        return !(/road/i.test(this.routerUrl)) && !(/StyleAndSweat/i.test(this.postCategory));
    }

    hiddenFeedback() {
        return !(/commerce/i.test(this.routerUrl));
    }

}
