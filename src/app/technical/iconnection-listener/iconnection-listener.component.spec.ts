import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconnectionListenerComponent } from './iconnection-listener.component';

describe('IconnectionListenerComponent', () => {
  let component: IconnectionListenerComponent;
  let fixture: ComponentFixture<IconnectionListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconnectionListenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconnectionListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
