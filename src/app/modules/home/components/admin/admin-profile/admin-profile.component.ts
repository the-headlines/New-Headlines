import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import * as jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

    profileForm: FormGroup;
    passForm: FormGroup;
    userData;
    profileImgConfig = {
        maxFiles: 1
    };

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {


        this.userData = jwtDecode(localStorage.getItem('token'));
        this.userData['name'] = localStorage.getItem('full_name');

        this.profileForm = this.fb.group({
            name: [],
            email: []
        });
        this.passForm = this.fb.group({
            new_password: [],
            current_password: []
        });

        this.profileForm.patchValue(this.userData);
    }

    saveProfile() {
        this.auth.updateProfile(this.profileForm.value).subscribe(dt => {
            this.toastr.success('Profile info has been updated successfully');
        });
    }

    updatePass() {
        console.log(this.passForm.value);
        this.auth.updatePassword(this.passForm.value).subscribe(dt => {
            this.toastr.success('The password has been updated successfully');
        });
    }


}
