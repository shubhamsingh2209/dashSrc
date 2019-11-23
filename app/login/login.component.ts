import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import {DataAccessService } from '../common/services/data-access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router"


class errorResponse {
  constructor(
    public show: Boolean,
    public profileVerified: Boolean,
    public emailInvalid: Boolean,
    public passwordInvalid: Boolean
  ) {  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loadAPI: Promise<any>;
  env: string;
  api: string;
  loginData: FormGroup;
  submitted = false;
  errorResponse1=new errorResponse(false,false,false,false); 
  constructor(private dataccess: DataAccessService,private formBuilder: FormBuilder,private cookieService: CookieService,private router: Router) {
    this.env=ConstantsService.baseURL;
    this.api=ConstantsService.baseApiURL; 
  	this.loadAPI = new Promise((resolve) => {
    	let scriptsLoad=[];
        scriptsLoad[0]=this.env+'/assets/js/jquery.min.js';
        scriptsLoad[1]=this.env+'/assets/js/matrix.login.js';
        scriptsLoad[2]=this.env+'/assets/js/mar_common.js';
        for(let j=0;j<scriptsLoad.length;j++){
              let node = this.loadScript(scriptsLoad[j]);
              if (node) {
                  node.onload = () => {
                      resolve(true);
                  };
              } else {
                  resolve(true);
              }
         }
    });
   }

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern("([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+")]]
    });
  }
  get logincontrols() { return this.loginData.controls; }
  loadScript(scripted: any) {
    let node = undefined;
    let isFound = false;
    const scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; ++i) {
        // Check if script is already there in html
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
          isFound = true;
        }
    }

	if (!isFound) {
			node = document.createElement('script');
	        node.src = scripted;
	        node.type = 'text/javascript';
	        node.async = false;
	        node.charset = 'utf-8';
	        document.getElementsByTagName('head')[0].appendChild(node);
        	return node;
    }
    return node;
 }

 onSubmit(){
   debugger;
  this.submitted = true;
  let responseData:any={};
  let finalData:any={};
  finalData['email']=this.loginData.value.email;
  finalData['password']=this.loginData.value.password;
  finalData['action']='login';
  this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',finalData).subscribe(userData =>{
    responseData=userData;
    if(responseData.status.code==1){
      if(responseData.data.profileverified==null || responseData.data.profileverified==0){
        this.errorResponse1=new errorResponse(true,true,false,false);
      }else{
        this.cookieService.set( 'user',responseData.data.id  );
        this.cookieService.set( 'token', responseData.data.userToken );
        //this.router.navigate(['/edit']);
        window.location.replace('/edit');
      }
    }else{
      if(responseData.status.message.wrong=='email' || responseData.status.message.invalid=='email'){
        this.errorResponse1=new errorResponse(true,false,true,false);
      }else if(responseData.status.message.wrong[0]=='password' || responseData.status.message.invalid[0]=='password'){
        this.errorResponse1=new errorResponse(true,false,false,true);
      }
    }
  });
}
}
