import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { IApiData } from './app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //we will use the Angular http service to make http requests
  http: HttpClient = inject(HttpClient);
  
  baseUrl='api/'; //relates to our backend API url

  async callAPI(url: string, apiCommand: string, formData: any) {
  
   try {
      let headers = new HttpHeaders();
    headers = headers.set('Api', apiCommand);
    const httpOptions = { headers: headers };
    const data = await firstValueFrom(this.http.post(this.baseUrl + url, formData, httpOptions)) as IApiData;
    return data;
   } catch (error: any) {
    return {
      success: false,
      result: null,
      message: 'An error occurred while calling the API. ' + error
    } as IApiData;
   }    
  }



}
