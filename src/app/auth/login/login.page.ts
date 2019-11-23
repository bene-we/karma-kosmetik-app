import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    isSubmitted = false;

    validationErrors = {
        email: [
            { type: 'required', message: 'Bitte gib eine Email-Adresse an' },
            { type: 'email', message: 'Bitte gib eine gültige Email-Adresse an' },
            { type: 'accountDisabled', message: 'Dein Konto ist deaktiviert. Ist dies die richtige Email-Adresse?' },
            { type: 'userNotFound', message: 'Es existiert kein Konto mit dieser Email, registriere dich zuerst' }
        ],
        password: [
            { type: 'required', message: 'Bitte gib ein Passwort ein' },
            { type: 'minlength', message: 'Das Passwort muss mind. 6 Zeichen lang sein' },
            { type: 'wrong', message: 'Das eingegebene Passwort ist falsch' }
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private toastService: ToastService,
                private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        const credentials = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.login(credentials);

    }

    login(credentials) {
        this.authService.login(credentials).then(
            () => this.router.navigate(['/app/home']),
            error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        this.loginForm.get('email').setErrors({ email: true });
                        break;
                    case 'auth/user-disabled':
                        this.loginForm.get('email').setErrors({ accountDisabled: true });
                        break;
                    case 'auth/user-not-found':
                        this.loginForm.get('email').setErrors({ userNotFound: true });
                        break;
                    case 'auth/wrong-password':
                        this.loginForm.get('password').setErrors({ wrong: true });
                        break;
                    default:
                        // noinspection JSIgnoredPromiseFromCall
                        this.toastService.showToast('Etwas ist schiefgelaufen, versuche es bitte später erneut', 5000);
                }
            }
        );
    }

}
