import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass']
})
export class TermsComponent implements OnInit {
    showInfo = true;

    constructor() {
    }

  ngOnInit() {
  }
    toggleInfo() {
        this.showInfo = !this.showInfo;
    }
}
