import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss'],
})
export class ImageSettingsComponent implements OnInit, AfterViewInit {
  constructor(private formBuilder: FormBuilder) {}

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

  ngAfterViewInit() {
    console.log(this.preview?.nativeElement);
  }

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
    console.log(this.preview?.nativeElement);
  }

  clearImgList() {
    this.imgName = '';
    this.imgUrl = '';
  }

  onSubmit() {}
}
