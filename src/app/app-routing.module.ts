import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule',
    },
    {
        path: 'app/news/news-detail',
        loadChildren: './news/news-detail/news-detail.module#NewsDetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'app/home/profile',
        loadChildren: './home/profile/profile.module#ProfilePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'app/login',
        loadChildren: './auth/login/login.module#LoginPageModule'
    },
    {
        path: 'app/register',
        loadChildren: './auth/register/register.module#RegisterPageModule'
    },
    {
        path: 'qr-code/:code',
        redirectTo: 'landing',
        pathMatch: 'prefix'
    },
    {
        path: 'landing',
        loadChildren: './qr-landing/qr-landing.module#QrLandingPageModule'
    },
    {
        path: 'intro',
        loadChildren: './intro/intro.module#IntroPageModule'
    },
    {
        path: '**',
        redirectTo: ''
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
