import { Injectable } from '@angular/core';
import { weakShareReplay } from './utils';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppSettings } from 'src/app/models/common/appsettings';

const configFile = environment.production ? './assets/config/appsettings.json' : './assets/config/appsettings.dev.json';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    // Read Base Url From appsettings.json
    public appSettings$ = this.http.get(configFile).pipe(
        map(v => v as AppSettings),
        weakShareReplay(1));

    constructor(private http: HttpClient) { }
}
