import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsService } from '../components.service';
import * as animation from '../data/animations';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss'],
})
export class ImageSettingsComponent implements OnInit, AfterViewInit {
  constructor(
    private formBuilder: FormBuilder,
    private componentsService: ComponentsService
  ) {}

  @ViewChild('preview') preview?: ElementRef<any>;

  form?: FormGroup;
  imgUrl?: string | ArrayBuffer;
  imgName?: string;
  animationTypes: any[] = [
    'none',
    'slide in from top',
    'zoom in from bottom',
    'left to right',
    'right to left',
  ];

  ngOnInit() {
    this.setForm();
  }

  ngAfterViewInit() {}

  setForm() {
    this.form = this.formBuilder.group({
      imageFile: [, Validators.required],
      animationType: [],
      imageWidth: [100],
      imageHeight: [100],
      containerWidth: [100],
      containerHeight: [100],
      horizontalPosition: [0],
      verticalPosition: [0],
    });
  }

  uploadImageFile(file: any) {
    this.imgName = file[0].name;
    this.form?.patchValue({
      imageFile: [file[0]],
    });
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      if (reader.result !== null) {
        this.imgUrl = reader.result;
      }
    };
  }

  clearImgList() {
    this.imgName = '';
    this.imgUrl = '';
  }

  addAnimation(event: Event) {
    let animationStyle = '';
    let animationName = '';
    if (event.toString() === 'none') {
      animationStyle = animation.none;
      animationName = 'none';
    }
    if (event.toString() === 'slide in from top') {
      animationStyle = animation.slideInFromTop;
      animationName = 'slideInFromTop';
    }
    if (event.toString() === 'zoom in from bottom') {
      animationStyle = animation.zoomInFromBottom;
      animationName = 'zoomInFromBottom';
    }
    if (event.toString() === 'left to right') {
      animationStyle = animation.leftToRight;
      animationName = 'leftToRight';
    }
    if (event.toString() === 'right to left') {
      animationStyle = animation.rightToLeft;
      animationName = 'rightToLeft';
    }
    const img = document.querySelector('img');
    if (img) {
      img.style.animation = `${animationName} 3s ease`;
      const style = document.createElement('style');
      style.textContent = animationStyle;
      document.head.appendChild(style);
    }
  }

  downloadHTML() {
    const template = this.preview?.nativeElement;
    const data = this.componentsService.generateTemplate(template);
    const blob = new Blob([data], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'image';
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }

  setImageWidth() {
    const img = document.querySelector('img');
    const container = document.querySelector<HTMLElement>('.preview-container');
    if (img && container) {
      container.style.objectFit = 'none';
      img.style.objectFit = 'fill';
      img.style.width = `${this.form?.value.imageWidth}%`;
    }
  }

  setImageHeight() {
    const img = document.querySelector('img');
    const container = document.querySelector<HTMLElement>('.preview-container');
    if (img && container) {
      img.style.objectFit = 'cover';
      img.style.objectFit = 'fill';
      img.style.height = `${this.form?.value.imageHeight}%`;
    }
  }

  setContainerHeight() {
    const container = document.querySelector<HTMLElement>('.preview-container');
    const img = document.querySelector('img');
    if (container && img) {
      img.style.objectFit = 'cover';
      container.style.height = `${
        (400 * this.form?.value.containerHeight) / 100
      }px`;
    }
  }

  setContainerWidth() {
    const container = document.querySelector<HTMLElement>('.preview-container');
    const img = document.querySelector('img');
    if (container && img) {
      img.style.objectFit = 'cover';
      container.style.width = `${
        (500 * this.form?.value.containerWidth) / 100
      }px`;
    }
  }

  setPositionX() {
    const img = document.querySelector('img');
    if (img) {
      img.style.transform = `translateX(${
        this.form?.value.horizontalPosition * 4
      }px`;
    }
  }
  setPositionY() {
    const img = document.querySelector('img');
    if (img) {
      img.style.transform = `translateY(${
        this.form?.value.verticalPosition * 4
      }px`;
    }
  }
}
