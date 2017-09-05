import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFromComponent } from './lesson-from.component';

describe('LessonFromComponent', () => {
  let component: LessonFromComponent;
  let fixture: ComponentFixture<LessonFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
