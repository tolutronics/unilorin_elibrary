import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacultylistPage } from './facultylist.page';

describe('FacultylistPage', () => {
  let component: FacultylistPage;
  let fixture: ComponentFixture<FacultylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultylistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacultylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
