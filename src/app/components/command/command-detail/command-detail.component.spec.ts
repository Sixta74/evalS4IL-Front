import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDetailComponent } from './command-detail.component';

describe('CommandDetailComponent', () => {
  let component: CommandDetailComponent;
  let fixture: ComponentFixture<CommandDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
