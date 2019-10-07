import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './view/edit-profile/edit-profile.component';
import { ResidenceComponent } from './view/residence/residence.component';

const routes: Routes = [
  { path:'edit', component: EditProfileComponent},
  { path:'residence', component: ResidenceComponent},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
