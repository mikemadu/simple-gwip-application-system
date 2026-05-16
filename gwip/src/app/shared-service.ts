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
  async callAPI(url: string, apiCommand: string, incomingData: any) {  
    let formData = new FormData();
    if (incomingData) {
      Object.keys(incomingData).forEach(key => {
        const value = incomingData[key];
        // Don't append null or undefined values unless your backend expects them
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
    } else { formData.append('id', ''); }

   try {
     let headers = new HttpHeaders();
     headers = headers.set('ApiCommand', apiCommand);
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


/**
 * This function will compute the age from the date of birth
 * @param {*} dateString as the date of birth
 * @returns age as a numeral
 */
 computeAgeFromDate(dateString: string): number {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

}
