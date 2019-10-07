import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class DataAccessService { 
  data:any; 
  constructor(private client: HttpClient) { 
   
  }
  // public getTravellers(url:string){
  //  this.client.get(url)
  //  .subscribe( (data:any) => console.log(JSON.stringify(data)));
  // }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error: ', errorResponse.error.message);
    } else {
        console.error('Server Side Error: ', errorResponse);
    }

    return 'There is a problem with the service. We are notified & working on it. Please try again later.';
  }
  public getEmployee(url: string){
    return this.client.get(url)
        .pipe(catchError(this.handleError));
  }
  public postdata(url:string,data:string[]){
    const data1=JSON.stringify(data);
    return this.client.post(url,data1)
    .pipe(catchError(this.handleError));
  }
}
