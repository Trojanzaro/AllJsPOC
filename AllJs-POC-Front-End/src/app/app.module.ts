import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AppHeaderComponent } from './app-header/app-header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    MainDashboardComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
