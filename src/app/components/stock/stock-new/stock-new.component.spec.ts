import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNewComponent } from './stock-new.component';

describe('StockNewComponent', () => {
  let component: StockNewComponent;
  let fixture: ComponentFixture<StockNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
