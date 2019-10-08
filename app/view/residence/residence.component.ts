import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import {DataAccessService } from '../../common/services/data-access.service'

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ResidenceComponent implements OnInit {
  loadAPI: Promise<any>;
  env: string;
  api: string;
  cityData:any=[];
  furnData:any=[];
  amenData:any=[];
  constructor(private dataccess: DataAccessService) {
    this.env=ConstantsService.baseURL;
    this.api=ConstantsService.baseApiURL;
 
    this.loadAPI = new Promise((resolve) => {
    	let scriptsLoad=[];
        scriptsLoad[0]=this.env+'/assets/js/select2.full.min.js';
        scriptsLoad[1]=this.env+'/assets/js/select2.min.js';
        scriptsLoad[2]='https://maps.googleapis.com/maps/api/js?key=AIzaSyB10yGRo6cCTiMJQNZYNbvhblT-EGVCZt0';
        scriptsLoad[3]=this.env+'/assets/js/demo.js';
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
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/city').subscribe(citydata => {
      this.cityData = citydata;
      console.log(this.cityData);
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/resident/amenities').subscribe(amentdata => {
      this.furnData = amentdata;
      console.log(this.furnData);
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/resident/furnishing').subscribe(funisdata => {
      this.amenData = funisdata;
      console.log(this.amenData);
    });
   }


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

}
