import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loadAPI: Promise<any>;

constructor() {
    this.loadAPI = new Promise((resolve) => {
    	let scriptsLoad=[];
		scriptsLoad[0]='/../../assets/js/jquerydashboard.min.js';
		scriptsLoad[1]='/../../assets/js/bootstrapdashboard.min.js';
		scriptsLoad[2]='/../../assets/js/sidebarmenu.js';
		scriptsLoad[3]='/../../assets/js/mar_common.js';
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

}

