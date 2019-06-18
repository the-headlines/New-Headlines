import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;

    isShown = false;
    currentPost = {};
    openNum: boolean;


    constructor(private renderer: Renderer2) {

        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
            }
        });

        this.openNum = false;
    }

    ngOnInit() {

    }

    show(single) {
        this.isShown = true;
        this.currentPost = single;
    }
}
