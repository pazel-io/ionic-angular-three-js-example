import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { loadGLTF } from '../loadGLTF';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements AfterViewInit {
  @ViewChild('threejsContainer') threejsContainer: ElementRef;

  @Input() fileName: string;
  @Input() filePath: string;
  @Input() name: string;
  @Input() position: number[];
  @Input() cssClass: string;

  constructor() {}

  ngAfterViewInit(): void {
    loadGLTF({
      fileName: this.fileName,
      filePath: this.filePath,
      container: this.threejsContainer.nativeElement,
      position: this.position,
    });
  }
}
