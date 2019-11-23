import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { EditProfileComponent } from './view/edit-profile/edit-profile.component';
import { ConstantsService } from './common/services/constants.service';
import { HttpClientModule } from '@angular/common/http';
import { ResidenceComponent } from './view/residence/residence.component';
import { RoomaddComponent } from './view/roomadd/roomadd.component';
import { TicketComponent } from './view/ticket/ticket.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { SignupComponent } from './signup/signup.component';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EditProfileComponent,
    ResidenceComponent,
    RoomaddComponent,
    TicketComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConstantsService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
