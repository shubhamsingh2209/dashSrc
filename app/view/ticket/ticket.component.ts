import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import {DataAccessService } from '../../common/services/data-access.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TicketComponent implements OnInit {
  loadAPI: Promise<any>;
  env: string;
  api: string;
  ticketData:any=[];

  constructor(private dataccess: DataAccessService) {
    this.env=ConstantsService.baseURL;
    this.api=ConstantsService.baseApiURL;
    this.loadAPI = new Promise((resolve) => {
    	let scriptsLoad=[];
        scriptsLoad[0]=this.env+'/assets/js/datatables.min.js';
        scriptsLoad[1]=this.env+'/assets/js/sweetalert2.js';
        scriptsLoad[2]=this.env+'/assets/js/bootstrap-datetimepicker.js';
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
    this.dataccess.getEmployee('http://local-serve.marvel.com/v1/get/ticket/4').subscribe(ticketdata => {
      this.ticketData =ticketdata;
      debugger;
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
