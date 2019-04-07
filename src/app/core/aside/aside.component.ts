import {Component, OnInit} from '@angular/core';
import {AsideService} from "../../services/aside.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {


    constructor(private  aside: AsideService, private router: Router) {
    }

    lastet: any = [];

    ngOnInit() {
        this.getLasted();
        console.log(this.lastet);
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getLasted() {
        this.aside.getLasted().subscribe((data) => {
            console.log(data);
            if (!data) {
                return false;
            }

            if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            }

            this.lastet = data['result'];
        });
    }
}
