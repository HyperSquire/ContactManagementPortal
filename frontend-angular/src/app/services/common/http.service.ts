import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { AppSettingsService } from './appsettings.service';
import { HttpClientService } from './httpclient.service';
import { getCurrent } from './utils';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public webServiceUrl$ = this.appsettingsService.appSettings$.pipe(map(it => it.WebServiceUrl));

  constructor(
    private httpClientService: HttpClientService,
    private appsettingsService: AppSettingsService) {
  }

  async get(url: string): Promise<any> {
    const response = await this.getRequest<any>(url);
    return response;
  }

  async post(url: string, payload: any): Promise<any> {
    const response = await this.postRequest<any>(url, payload);
    return response;
  }

  // Complete the API Url with base url
  private getRequest = <T>(url: string) => getCurrent(this.webServiceUrl$.pipe(
    switchMap(baseUrl => this.httpClientService.get(baseUrl + url)),
    map(x => x as T))
  )

  private postRequest = <T>(url: string, payload: any) => getCurrent(this.webServiceUrl$.pipe(
    switchMap(baseUrl => this.httpClientService.post(baseUrl + url, payload)),
    map(x => x as T)
  ))

}
