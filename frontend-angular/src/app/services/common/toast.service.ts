// angular packages
import { Injectable } from '@angular/core';

// third party packages
import { ToastOptions, ToastaConfig, ToastaService } from 'ngx-toasta';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

type Flag = 'default' | 'info' | 'success' | 'wait' | 'error' | 'warning';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastyService: ToastaService,
        private toastyConfig: ToastaConfig,
        private toastr: ToastrService) {
        this.toastyConfig.limit = 1;
    }

    // Toast Notification Config
    addToast(title: string, msg: string, flag: 'default' | 'info' | 'success' | 'wait' | 'error' | 'warning') {

        const toastOptions: ToastOptions = {title, msg, showClose: true, timeout: 5000, theme: 'bootstrap'};

        const toastConfig: IndividualConfig = {
            newestOnTop: false,
            closeButton: true,
            progressBar : true,
            progressAnimation : 'increasing',
            positionClass : 'toast-top-right',
            timeOut: 5000,
            disableTimeOut: false,
            easing : 'ease-in',
            easeTime : 300,
            enableHtml : false,
            extendedTimeOut : 1000,
            toastClass : 'ngx-toastr',
            titleClass: 'toast-title',
            messageClass : 'toast-message',
            tapToDismiss : true,
            onActivateTick : false
        };

        switch (flag) {
            case ('default'):
                this.toastyService.default(toastOptions);
                break;
            case ('info'):
                this.toastr.info(msg, title, toastConfig);
                break;
            case ('success'):
                this.toastr.success(msg, title, toastConfig);
                break;
            case ('wait'):
                this.toastyService.wait(toastOptions);
                break;
            case ('error'):
                this.toastr.error(msg, title, toastConfig);
                break;
            case ('warning'):
                this.toastr.warning(msg, title, toastConfig);
                break;
            default:
                break;
        }
    }

    clearToast() {
        this.toastyService.clearAll();
    }
}
