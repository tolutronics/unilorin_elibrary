import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JournalsPage } from './journals.page';

describe('JournalsPage', () => {
  let component: JournalsPage;
  let fixture: ComponentFixture<JournalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JournalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
