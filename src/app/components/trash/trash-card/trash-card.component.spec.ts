import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCardComponent } from './trash-card.component';

describe('TrashCardComponent', () => {
  let component: TrashCardComponent;
  let fixture: ComponentFixture<TrashCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrashCardComponent]
    });
    fixture = TestBed.createComponent(TrashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
