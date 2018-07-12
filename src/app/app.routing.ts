import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'board',
      component: BoardComponent
    }
  ];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
