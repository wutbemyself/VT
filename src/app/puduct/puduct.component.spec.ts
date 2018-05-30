import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuductComponent } from './puduct.component';

describe('PuductComponent', () => {
  let component: PuductComponent;
  let fixture: ComponentFixture<PuductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
