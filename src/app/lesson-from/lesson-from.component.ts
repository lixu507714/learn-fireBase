import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {validateUrl} from '../shared/validators/vaildateUrl';

@Component({
  selector: 'app-lesson-from',
  templateUrl: './lesson-from.component.html',
  styleUrls: ['./lesson-from.component.scss']
})
export class LessonFromComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() initialValue: any;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      videoUrl: ['', [Validators.required, validateUrl]],
      tags: ['', Validators.required],
      longDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
    }
  }

  isErrorVisible(field: string, err: string) {
    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[err];
  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }
}
