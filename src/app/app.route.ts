import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '/404'
  }
];
