import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { IApiData } from './app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //we will use the Angular http service to make http requests
  http: HttpClient = inject(HttpClient);
  
  baseUrl='api/'; //relates to our backend API url

  /**
   * This function calls the backend and returns a Promise.
   * @param url Backend endpoint
   * @param apiCommand What command to send to the server
   * @param formData Collection of data to submit
   * @returns ApiData interface
   */
  async callAPI(url: string, apiCommand: string, formData: any) {  
   try {
     let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
       .set('ApiCommand', apiCommand);
     const httpOptions = { headers: headers };
     
    
    const data = await firstValueFrom(this.http.post(this.baseUrl + url, formData, httpOptions)) as IApiData;
    return data;
   } catch (error: HttpErrorResponse | any) {
    return {
      success: false,
      result: null,
      message: 'Error calling the API. Error Message is: ' + error.message
    } as IApiData;
   }    
  }



}
