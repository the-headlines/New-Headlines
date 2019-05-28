import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';

export class ModalDialog {

    public static openDialog(page, dialog) {

        if (page === 2) {

            dialog.open(RegisterComponent);
        } else {
            dialog.open(LoginComponent);
        }
    }
}
