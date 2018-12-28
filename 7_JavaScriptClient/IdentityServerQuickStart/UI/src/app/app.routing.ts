import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { VisualizationComponent } from './shared/visualization/visualization.component';
import { NotAuthorizedComponent } from './shared/not-authorized/not-authorized.component';

const appRoutes: Routes = [
    /*{
        path: '',
        pathMatch: 'full'
        redirectTo: 'home'
    },*/
    {
        path: '',
        loadChildren: './glr/nonpo/nonpo.module#NonpoModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'po',
        loadChildren: './glr/po/po.module#PoModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'explore',
        component: VisualizationComponent
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
