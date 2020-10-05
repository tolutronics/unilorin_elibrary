import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JbankPage } from './jbank.page';

describe('JbankPage', () => {
  let component: JbankPage;
  let fixture: ComponentFixture<JbankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JbankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
