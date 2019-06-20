import {Component, OnInit} from '@angular/core';
import {AsideService} from '../../services/aside.service';
import {Router} from '@angular/router';

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
    }

    getSingle(id) {
        this.router.navigate(['/posts', id]);
    }

    getLasted() {
        this.aside.getLasted().subscribe((data) => {
            if (!data) {
                return false;
            } else if (!data['status'] && data['status'] == 0) {
                alert('No data');
                return false;
            } else {
                this.lastet = data;
                // return console.log('sss', this.lastet);
            }
        });
    }

    strip_tags(str) {
        return str.replace(/<[^>]*>/g, '');
    }
}
