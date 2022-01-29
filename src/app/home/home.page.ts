import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private models = {
    toy: {
      fileName: '1643422158392.gltf',
      cssClass: 'cuddly-pink',
    },
    pot: {
      fileName: '1643422846453.gltf',
      position: [0, 0, 3],
      cssClass: 'dark-purple',
    },
  };

  constructor(private modalController: ModalController) {}

  async view(name: string) {
    const { fileName, position, cssClass } = this.models[name];
    const modal = await this.modalController.create({
      component: ViewerComponent,
      cssClass: 'my-custom-class',
      breakpoints: [0.95],
      initialBreakpoint: 0.95,
      componentProps: {
        fileName,
        filePath: `/assets/models/${name}/`,
        position,
        cssClass,
      },
    });
    return await modal.present();
  }
}
