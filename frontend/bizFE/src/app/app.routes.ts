import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BusinessesComponent } from './component/businesses/businesses.component';
import { BusinessComponent } from './component/businesses/singleBusiness/business.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'businesses',
        component: BusinessesComponent
    },
    {
        path: 'businesses/:id',
        component: BusinessComponent
    }
];
