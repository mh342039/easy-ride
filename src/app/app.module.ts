import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//Components
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
import { UpdateRidesComponent } from './component/update-rides/update-rides.component'


//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { TermsComponent } from './component/terms/terms.component';
import { FaqComponent } from './component/faq/faq.component';
import { ContactComponent } from './component/contact/contact.component';
import { RideSearchComponent } from './component/ride-search/ride-search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
    MyRidesComponent,
    UpdateRidesComponent,
    TermsComponent,
    FaqComponent,
    ContactComponent,
    RideSearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
