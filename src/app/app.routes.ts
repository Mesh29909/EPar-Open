import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { EventCheckInComponent } from './registration/pages/event-check-in/event-check-in.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registration/event-check-ins/new', component: EventCheckInComponent },
  { path: '**', component: PageNotFoundComponent }
];
