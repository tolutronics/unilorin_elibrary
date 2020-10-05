import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileuploadPageRoutingModule } from './fileupload-routing.module';
import { FileuploadPage } from './fileupload.page';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    IonicModule,
    FileuploadPageRoutingModule
  ],
  declarations: [FileuploadPage,FooterComponent,HeaderComponent],
  entryComponents: [FooterComponent,HeaderComponent]
})
export class FileuploadPageModule {}
