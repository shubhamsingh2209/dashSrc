import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ConstantsService } from '../common/services/constants.service';
import {DataAccessService } from '../common/services/data-access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  loadAPI: Promise<any>;
  env: string;
  api: string;
  signupData: FormGroup;
  submitted = false;
  resendhtml= false;
  repeatPassError=false;
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
    this.signupData = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required,Validators.pattern("([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+")]],
      password: ['', [Validators.required,Validators.pattern("([a-zA-Z0-9_\.\-]{8,})")]],
      repeatpass: ['', Validators.required]
    });
  }
  get logincontrols() { return this.signupData.controls; }
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
  this.submitted = true;
  this.repeatPassError=false;
  if (this.signupData.invalid) {
    return;
  }
  if (this.signupData.value.password!=this.signupData.value.repeatpass) {
    this.repeatPassError=true;
    return;
  }

  let responseData:any={};
  let finalData:any={};
  finalData['firstName']=this.signupData.value.firstname;
  finalData['lastName']=this.signupData.value.lastname;
  finalData['password']=this.signupData.value.password;
  finalData['email']=this.signupData.value.email;
  finalData['action']='signup';
  this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',finalData).subscribe(userData =>{
    responseData=userData;
    if(responseData.status.code==1){
      this.resendhtml=true;
    }else{
      alert('System error! Please try again');
    }
  });
  
 }

 sendverify(){
  let reverData1:any={};

  let revrifyData:any={};
  revrifyData['email']=this.signupData.value.email;
  this.dataccess.postdata('http://local-serve.marvel.com/v1/auth/reverify',revrifyData).subscribe(reverData =>{
    reverData1=reverData;
    if(reverData1.status.code==1){
      this.resendhtml=true;
    }else{
      alert('System error! Please try again');
    }
  });
 }
}
