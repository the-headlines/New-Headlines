import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-story-options',
    templateUrl: './story-options.component.html',
    styleUrls: ['./story-options.component.scss']
})
export class StoryOptionsComponent implements OnInit {
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;
    @Input() single;

    isShown = false;
    currentPost = {};
    openNum: boolean;

    constructor(private renderer: Renderer2) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.toggleButton && e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
                // console.log('window click');
            }
        });

        this.openNum = false;
    }

    ngOnInit() {
    }

    toggleShow(single) {
        this.isShown = !this.isShown;
        this.currentPost = single;
        // console.log('button click')
    }
}
