import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './view/edit-profile/edit-profile.component';
import { ResidenceComponent } from './view/residence/residence.component';
import { TicketComponent } from './view/ticket/ticket.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path:'edit', component: EditProfileComponent},
  { path:'residence', component: ResidenceComponent},
  { path:'ticket', component: TicketComponent},
  { path:'login', component: LoginComponent},
  { path:'signup', component: SignupComponent}
    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
