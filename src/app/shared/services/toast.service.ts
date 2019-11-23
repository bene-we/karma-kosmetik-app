import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) { }

    async showToast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message,
            duration,
            cssClass: 'toast-bottom-position',
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        toast.present();
    }
}
