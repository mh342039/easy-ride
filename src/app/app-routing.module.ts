import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { MainComponent } from './component/main/main.component';
import { MyRidesComponent } from './component/my-rides/my-rides.component';
import { PublishRideComponent } from './component/publish-ride/publish-ride.component';
import { RideDetailsComponent } from './component/ride-details/ride-details.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'updatePassword', component: UpdatePasswordComponent },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', component: HomepageComponent },
      { path: 'search-result', component: SearchResultComponent },
      { path: 'ride-details', component: RideDetailsComponent },
      { path: 'my-rides', component: MyRidesComponent },
      { path: 'publish-ride', component: PublishRideComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
