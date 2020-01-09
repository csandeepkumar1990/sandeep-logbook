import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetImgComponent } from './tweet-img.component';

describe('TweetImgComponent', () => {
  let component: TweetImgComponent;
  let fixture: ComponentFixture<TweetImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
