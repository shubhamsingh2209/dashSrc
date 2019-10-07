import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = 'http://localhost:4200/';
  constructor() { }
  public static get baseURL(): string { return "http://localhost:4200"; }
  public static get baseApiURL(): string { return "http://local-serve.marvel.com"; }

}
