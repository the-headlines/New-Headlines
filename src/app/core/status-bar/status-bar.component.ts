import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('share') share: ElementRef;

    @Input() single;

    isShown = false;
    currentPost = {};
    openNum: boolean;
    routerUrl: string;

    constructor(private renderer: Renderer2, public router: Router) {

        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.toggleButton && e.target !== this.toggleButton.nativeElement) {
                this.isShown = false;
            }
        });
        // this.renderer.listen('window', 'click', (e: Event) => {
        //     if (e.target !== this.toggleButton.nativeEllement) {
        //         this.isShown = false;
        //     }
        // });

        this.openNum = false;
    }

    ngOnInit() {
        this.routerUrl = this.router.url;
    }

    show(single) {
        this.isShown = true;
        this.currentPost = single;
    }

    getSingle(id) {
        this.router.navigate(['/post', id]);
    }
}
