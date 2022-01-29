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
      name: 'Snugglebug',
    },
    pot: {
      fileName: '1643422846453.gltf',
      position: [0, 0, 3],
      cssClass: 'dark-purple',
      name: 'Mina Kari Sugar Cube Bowl',
    },
  };

  constructor(private modalController: ModalController) {}

  async view(key: string) {
    const { fileName, position, cssClass, name } = this.models[key];
    const modal = await this.modalController.create({
      component: ViewerComponent,
      cssClass: 'my-custom-class',
      breakpoints: [0.95],
      initialBreakpoint: 0.95,
      componentProps: {
        fileName,
        filePath: `/assets/models/${key}/`,
        position,
        cssClass,
        name,
      },
    });
    return await modal.present();
  }
}
