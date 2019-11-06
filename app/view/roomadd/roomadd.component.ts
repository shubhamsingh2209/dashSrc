import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import {DataAccessService } from '../../common/services/data-access.service';



@Component({
  selector: 'app-roomadd',
  templateUrl: './roomadd.component.html',
  styleUrls: ['./roomadd.component.css']
})
export class RoomaddComponent implements OnInit {
  env: string;
  api: string;
  @Input() bedcount:number;
  @Input() roomType:string;
  @Input() roomCount:number;
  @Input() furnroomData:any=[];
  @Input() roomBath:any=[];
  @Input() bedFurn:any=[];
  constructor(private dataccess: DataAccessService) {
    this.env=ConstantsService.baseURL;
    this.api=ConstantsService.baseApiURL;
  } 
  ngOnInit() {
    // debugger;
    // if(this.roomType=='roomSingleTypeadd')
    //   this.bedcount=1;
    // else if(this.roomType=='roomDoubleTypeadd')
    //   this.bedcount=2;
    // else if(this.roomType=='roomTripleTypeadd')
    //   this.bedcount=3;
    // else if(this.roomType=='roomFourTypeadd')
    //   this.bedcount=4;
  }
  createRange(number1:number){
    var items: number[] = [];
    for(var i = 1; i <= number1; i++){
       items.push(i);
    }
    return items;
  }

}
