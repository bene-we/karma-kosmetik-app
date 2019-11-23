import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ConfirmPasswordValidator } from '../../shared/validators/confirm-password';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    isSubmitted = false;

    validationErrors = {
        name: { type: 'required', message: 'Bitte gib einen Namen ein' },
        email: [
            { type: 'required', message: 'Bitte gib eine Email-Adresse an' },
            { type: 'email', message: 'Bitte gib eine gültige Email-Adresse an' },
            { type: 'accountDisabled', message: 'Dein Konto ist deaktiviert. Ist dies die richtige Email-Adresse?' },
            { type: 'emailInUse', message: 'Es existiert bereits ein Konto mit dieser Email'}
        ],
        password: [
            { type: 'required', message: 'Bitte gib ein Passwort ein' },
            { type: 'minlength', message: 'Das Passwort muss mind. 6 Zeichen lang sein' }
        ],
        confirmPassword: [
            { type: 'required', message: 'Bitte bestätige dein Passwort' },
            { type: 'confirmPassword', message: 'Die Passwörter müssen übereinstimmen' }
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private toastService: ToastService,
                private router: Router) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])],
            confirmPassword: ['', Validators.required]
        }, {
            // must be 'validators'
            // see https://github.com/angular/angular/issues/26109
            validators: ConfirmPasswordValidator.MatchPassword,
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        const credentials = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        };

        this.register(credentials);

    }

    register(credentials) {
        this.authService.register(credentials).then(
            () => this.router.navigate(['/app/home']),
            error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        this.registerForm.get('email').setErrors({ emailInUse: true });
                        break;
                    case 'auth/invalid-email':
                        this.registerForm.get('email').setErrors({ email: true });
                        break;
                    case 'auth/operation-not-allowed':
                        this.registerForm.get('email').setErrors({ accountDisabled: true });
                        break;
                    case 'auth/weak-password':
                        this.registerForm.get('password').setErrors({ weak: true });
                        break;
                    default:
                        // noinspection JSIgnoredPromiseFromCall
                        this.toastService.showToast('Etwas ist schiefgelaufen, versuche es bitte später erneut', 5000);
                }
            }
        );
    }

}
