import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileuploadPage } from './fileupload.page';

describe('FileuploadPage', () => {
  let component: FileuploadPage;
  let fixture: ComponentFixture<FileuploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
