import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionCentralizerComponent } from './connection-centralizer.component';

describe('ConnectionCentralizerComponent', () => {
  let component: ConnectionCentralizerComponent;
  let fixture: ComponentFixture<ConnectionCentralizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionCentralizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionCentralizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
