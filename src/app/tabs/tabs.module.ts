import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: 'app',
        component: TabsPage,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    },
                    {
                        path: 'score',
                        loadChildren: '../home/score/score.module#ScorePageModule',
                    },
                    {
                        path: 'history',
                        loadChildren: '../home/history/history.module#HistoryPageModule'
                    },
                    {
                        path: 'product-detail',
                        loadChildren: '../home/product-detail/product-detail.module#ProductDetailPageModule'
                    }
                ]
            },
            {
                path: 'news',
                loadChildren: '../news/news.module#NewsPageModule',
            }
        ]
    },
    {
        path: '',
        redirectTo: 'app/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {}
