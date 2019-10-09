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




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EditProfileComponent,
    ResidenceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
