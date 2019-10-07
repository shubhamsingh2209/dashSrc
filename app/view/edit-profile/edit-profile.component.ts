import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import {DataAccessService } from '../../common/services/data-access.service'

class editdata {
  constructor(
    public name: string,
    public gender: string,
    public email: string,
    public city: string,
    public orgname: string,
    public designation: string,
    public about: string,
    public phoneno: string
  ) {  }
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {

loadAPI: Promise<any>;
env: string;
api: string;
citydata1:any=[];
userdataFinal:any=[];
editdata1=new editdata(null,null,null,null,null,null,null,null); 

constructor(private dataccess: DataAccessService) {
 
  this.env=ConstantsService.baseURL;
 
  this.api=ConstantsService.baseApiURL;
 
  this.citydata1=[]; 
  	this.loadAPI = new Promise((resolve) => {
    	let scriptsLoad=[];
        scriptsLoad[0]=this.env+'/assets/js/profilepic.js';
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

    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/city').subscribe(citydata => {
      this.citydata1 = citydata;
    });

    let formdata:any={};
    
    formdata['userToken']='cd812ae71967871fdf234bfa0cdd42b67937d9c0734e9d9a3229fee572cded883b11a5518eded1578c8a8dec110d5b060038ac86f4c926e5af7b57a0050a35d7rye+cQsqqp12wPkb+zwdF/YotWeq';
    formdata['action']='user_data';
    
    this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',formdata).subscribe(userdata =>{
      this.userdataFinal=userdata;
      this.editdata1=new editdata(
        this.userdataFinal.data.name,
        this.userdataFinal.data.gender,
        this.userdataFinal.data.email,
        this.userdataFinal.data.city.id,
        this.userdataFinal.data.orgname,
        this.userdataFinal.data.orgdesignation,
        this.userdataFinal.data.about,
        this.userdataFinal.data.phoneno
        );      
    });
   
 }

  ngOnInit() {
  	 this.loadAPI
        .then((flag) => {
        //Do something when script is loaded and parsed by browser
    });
    
  }
  loadScript(scripted) {
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
 onSubmit() {
  console.log(this.editdata1);
  let finaldatasend:any={};
  
  finaldatasend['action']='profile';
  finaldatasend['email']=this.editdata1.email;
  finaldatasend['location']=this.editdata1.city;
  finaldatasend['gender']=this.editdata1.gender;
  finaldatasend['phone']=this.editdata1.phoneno;
  finaldatasend['orgName']=this.editdata1.orgname;
  finaldatasend['orgDesignation']=this.editdata1.designation;
  finaldatasend['about']=this.editdata1.about;
  debugger;
    this.dataccess.postdata('http://local-serve.marvel.com/v1/auth',finaldatasend).subscribe(userdata =>{
      console.log(userdata);      
    });
}

}
