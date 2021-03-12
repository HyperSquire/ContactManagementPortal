// angular
import { Injectable } from '@angular/core';

// services
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    public requestIsActive = false;

    constructor(
        private httpClient: HttpClient,
        private toastService: ToastService
    ) { }

    private getHttpHeaders() {
        const options = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        };
        return options;
    }

    public post(url: string, body: any = {}) {
        return this.httpClient.post(url, body, this.getHttpHeaders()).pipe(
            tap(res => res),
            catchError((error: any) => this.onErrorHandler(error))
        );
    }

    public get(url: string) {
        return this.httpClient.get(url, this.getHttpHeaders()).pipe(
            tap(res => res),
            catchError((error: any) => this.onErrorHandler(error))
        )
    }

    // Common Error Handler For Http Requests
    private onErrorHandler(error: any) {
        if (error.error instanceof ProgressEvent) {
            this.toastService.addToast('', 'Unable to connect to server', 'error');
        }
        return throwError(error);
    }
}
