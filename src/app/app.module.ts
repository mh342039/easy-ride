import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MainComponent } from './component/main/main.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { RideDetailsComponent } from './component/ride-details/ride-details.component';
import { PublishRideComponent } from './component/publish-ride/publish-ride.component';
import { MyRidesComponent } from './component/my-rides/my-rides.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modules
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    SignUpComponent,
    HomepageComponent,
    ProfileComponent,
    UpdatePasswordComponent,
    SearchResultComponent,
    RideDetailsComponent,
    PublishRideComponent,
    MyRidesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
