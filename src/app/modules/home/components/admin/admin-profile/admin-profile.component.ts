import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

    profileForm: FormGroup;
    profileImgConfig = {
        maxFiles: 1
    };

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.profileForm = this.fb.group({});
    }

}
