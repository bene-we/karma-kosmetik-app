import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: User;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.user.subscribe(
            u => this.user = u
        );
    }

}
