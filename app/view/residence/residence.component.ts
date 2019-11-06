import { Component, OnInit, ViewEncapsulation,ElementRef ,ViewChild } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import {DataAccessService } from '../../common/services/data-access.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ResidenceComponent implements OnInit {
  loadAPI: Promise<any>;
  env: string;
  residencelat:string;
  api: string;
  cityData:any=[];
  furnData:any=[];
  amenData:any=[];

  furnroomData:any=[];
  roomBath:any=[];
  bedFurn:any=[];
  bedcount:number;
  

  resi_ament_error=false;
  resi_furn_error=false;
  residenceRegisterForm: FormGroup;
  submitted = false;
  selectedAmenties: any = [];
  selectedFurnishing: any = [];
  residentBlock=false;
  singleRoomDataShow=true;
  doubleRoomDataShow=true;
  tripleRoomDataShow=true;
  fourRoomDataShow=true;
  roomSingleSelectedCount:number;roomDoubleSelectedCount:number;roomTripleSelectedCount:number;roomFourSelectedCount:number;
  roomSingleTypeadd:string;roomDoubleTypeadd:string;roomTripleTypeadd:string;roomFourTypeadd:string;


  constructor(private dataccess: DataAccessService,private formBuilder: FormBuilder,public element: ElementRef) {
    this.env=ConstantsService.baseURL;
    this.api=ConstantsService.baseApiURL;
    this.element.nativeElement;
 
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
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/resident/amenities').subscribe(amentdata => {
      this.amenData = amentdata;
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/resident/furnishing').subscribe(funisdata => {
      this.furnData = funisdata;
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/room/bathroom').subscribe(roombathdata => {
      this.roomBath = roombathdata;
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/room/furnishing').subscribe(funisdata => {
      this.furnroomData = funisdata;
    });
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/columns/bed/furnishing').subscribe(bed1Furn => {
      this.bedFurn = bed1Furn;
    });
    this.residenceRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      houseno: ['', Validators.required],
      block: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      roomcount: ['', [Validators.required,Validators.pattern("[0-9]+")]]
    });
   }

   get f() { return this.residenceRegisterForm.controls; }
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

 onSubmit() {
  this.submitted = true;


  if(this.element.nativeElement.querySelector('[id="resi_ament"]').selectedOptions.length<1){
    this.resi_ament_error=true;
    return;
  }else{
    this.resi_ament_error=false;
    this.selectedAmenties=[];
    for (let i = 0; i < this.element.nativeElement.querySelector('[id="resi_ament"]').selectedOptions.length; i++) {
      this.selectedAmenties.push(this.element.nativeElement.querySelector('[id="resi_ament"]').selectedOptions[i].attributes[1].value);
    }
  }

  if(this.element.nativeElement.querySelector('[id="resi_furn"]').selectedOptions.length<1){
    this.resi_furn_error=true;
    return;
  }else{
    this.selectedFurnishing=[];
    this.resi_furn_error=false;
    for (let i = 0; i < this.element.nativeElement.querySelector('[id="resi_furn"]').selectedOptions.length; i++) {
      this.selectedFurnishing.push(this.element.nativeElement.querySelector('[id="resi_furn"]').selectedOptions[i].attributes[1].value);
    }
  }
  if (this.residenceRegisterForm.invalid) {
    return;
  }
  if(this.element.nativeElement.querySelector('[id="residencelat"]').value==""){
    alert('please select map , dislocate the marker');
  }
  let splitlocation=this.element.nativeElement.querySelector('[id="residencelat"]').value.split(",");
  let finalResidenceSend:any={};
  let cityData:any={};
  cityData['city']=this.residenceRegisterForm.value.city;
  cityData['houseNo']=this.residenceRegisterForm.value.houseno;
  cityData['block']=this.residenceRegisterForm.value.block;
  cityData['landmark']=this.residenceRegisterForm.value.landmark;
  cityData['pincode']=this.residenceRegisterForm.value.pincode;
  cityData['address']=this.residenceRegisterForm.value.address;
  cityData['lat']=splitlocation[0];
  cityData['lng']=splitlocation[1];

  finalResidenceSend['name']=this.residenceRegisterForm.value.name;
  finalResidenceSend['amenities']=this.selectedAmenties;
  finalResidenceSend['furnishing']=this.selectedFurnishing;
  finalResidenceSend['roomCount']=this.residenceRegisterForm.value.roomcount;
  finalResidenceSend['location']=cityData;
  finalResidenceSend['user']='2'; 
  this.dataccess.postdata('http://local-serve.marvel.com/v1/set/save/resident',finalResidenceSend).subscribe(userdata =>{
    this.residentBlock=true;     
  });

}

onResidentShow(){
  this.residentBlock=false;
}

/* add room data */
addRoom(roomType : any){
 if(roomType=='single'){
   this.singleRoomDataShow=true;
   let roomcount=this.element.nativeElement.getElementsByClassName('singleseater')[0].children[1].value;
   let checkBoxdetail=this.element.nativeElement.querySelector('[id="seat1input"]').checked;
   if(checkBoxdetail==false){
     alert('please select the checkbox first');
   }else if(roomcount<1){
    alert('sorry the roomcount cannot be less than ZERO');
   }else{
     this.singleRoomDataShow=false;
     this.roomSingleSelectedCount=roomcount;
     this.roomSingleTypeadd='single';
   }
  }
  if(roomType=='double'){
    this.doubleRoomDataShow=true;
    let roomcount=this.element.nativeElement.getElementsByClassName('doubleseater')[0].children[1].value;
    let checkBoxdetail=this.element.nativeElement.querySelector('[id="seat2input"]').checked;
    if(checkBoxdetail==false){
      alert('please select the checkbox first');
    }else if(roomcount<1){
     alert('sorry the roomcount cannot be less than ZERO');
    }else{
      this.doubleRoomDataShow=false;
      this.roomDoubleSelectedCount=roomcount;
     this.roomDoubleTypeadd='double';
    }
   }
   if(roomType=='triple'){
    this.tripleRoomDataShow=true;
    let roomcount=this.element.nativeElement.getElementsByClassName('tripleseater')[0].children[1].value;
    let checkBoxdetail=this.element.nativeElement.querySelector('[id="seat3input"]').checked;
    if(checkBoxdetail==false){
      alert('please select the checkbox first');
    }else if(roomcount<1){
     alert('sorry the roomcount cannot be less than ZERO');
    }else{
      this.tripleRoomDataShow=false;
      this.roomTripleSelectedCount=roomcount;
     this.roomTripleTypeadd='triple';
    }
   }
   if(roomType=='four'){
    this.fourRoomDataShow=true;
    let roomcount=this.element.nativeElement.getElementsByClassName('fourseater')[0].children[1].value;
    let checkBoxdetail=this.element.nativeElement.querySelector('[id="seat4input"]').checked;
    if(checkBoxdetail==false){
      alert('please select the checkbox first');
    }else if(roomcount<1){
     alert('sorry the roomcount cannot be less than ZERO');
    }else{
      this.fourRoomDataShow=false;
      this.roomFourSelectedCount=roomcount;
     this.roomFourTypeadd='four';
    }
   }
   if(roomType=='single')
      this.bedcount=1;
    else if(roomType=='doubel')
      this.bedcount=2;
    else if(roomType=='triple')
      this.bedcount=3;
    else if(roomType=='four')
      this.bedcount=4;

      $('.residentshow').ready(function(){
        $('.select2').select2();
     });
 }

/* add room data end here */

}
