// Custom validator to check if the fields 'password' and 'confirmPassword' match
// https://www.elite-corner.com/2018/09/match-password-validation-in-angular.html

import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;

        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ confirmPassword: true });
        } else {
            return null;
        }
    }
}
