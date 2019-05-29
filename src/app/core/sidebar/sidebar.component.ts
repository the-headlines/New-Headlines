import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    changeInfo = {name: '', email: '', password: ''};
    name = true;
    email = false;
    pass = false;

    constructor(private auth: PostsService) {
    }

    ngOnInit() {
    }

    changeInfoFunc(data) {
        console.log('user info', data);
        this.auth.updateUserInfo(data).subscribe((r: any) => {
            console.log('USER INFO12212', data);

            console.log(r);
            if (r[status] === 0) {
                console.log('aa');
                return false;
            }
            localStorage.setItem('userInf', JSON.stringify(r['result']));
        });
    }

    editText() {
        this.name = !this.name;
        this.email = !this.email;
        this.pass = !this.pass;
        console.log(this.name);
    }

    saveInfo(data) {
        this.auth.updateUserInfo(data).subscribe((r: any) => {
            console.log(data, 'changedUserInfo');

            if (r[status] === 0) {
                console.log('aa');
                return false;
            }
            localStorage.setItem('changeInfo', JSON.stringify(r['result']));

        });

        this.changeInfoFunc({name: this.changeInfo.name, email: this.changeInfo.email, pass: this.changeInfo.password});
    }
}
