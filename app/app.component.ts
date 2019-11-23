import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {DataAccessService } from './common/services/data-access.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pmdash';
  sidebarShow=true;
  constructor(private location: Location,private cookieService: CookieService,private dataccess: DataAccessService, ) {
    var pathString = location.path();
    if(pathString=='/login' || pathString=='/signup'){
      if(this.cookieService.get('token')){
        let responseData:any={};
        let finalData:any={};
        finalData['userToken']=this.cookieService.get('token');
        finalData['action']='user_data';
        this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',finalData).subscribe(userData =>{
          responseData=userData;
          if(responseData.status.code==1){
            window.location.replace('/edit');
          }else{
            cookieService.delete('token');
            cookieService.delete('user');
            this.sidebarShow=false;
          }
        });
       }else{
          this.sidebarShow=false;
       }

      
    }else{
       if(this.cookieService.get('token')){
        let responseData:any={};
        let finalData:any={};
        finalData['userToken']=this.cookieService.get('token');
        finalData['action']='user_data';
        this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',finalData).subscribe(userData =>{
          responseData=userData;
          if(responseData.status.code==1){
          }else{
            cookieService.delete('token');
            cookieService.delete('user');

            window.location.replace('/login');
          }
        });
       }else{
         window.location.replace('/login');
       }
    }   
  }
}
