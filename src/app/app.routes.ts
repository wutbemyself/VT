import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        // component: AppLayoutComponent, 
        children: [
            {
                path: 'test',
                children: [
                    {
                        path: '',
                        loadChildren: '',
                    }
                ]
            },
            {
                path: 'test2',
                children: [
                    {
                        path: '',
                        loadChildren: '',
                    }
                ]
            }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
