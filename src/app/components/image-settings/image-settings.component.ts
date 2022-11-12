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
      imageSize: [],
      containerWidth: [],
      containerHeight: [],
      horizontalPosition: [],
      verticalPosition: [],
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
    console.log(animationStyle);
    console.log(animationName);
  }

  downloadHTML() {
    const template = this.preview?.nativeElement;
    // const styles =
    const data = this.componentsService.generateTemplate(template, '');
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

  onSubmit() {}
}
