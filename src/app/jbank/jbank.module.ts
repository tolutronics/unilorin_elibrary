import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';

import { JbankPageRoutingModule } from './jbank-routing.module';

import { JbankPage } from './jbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JbankPageRoutingModule
  ],
  declarations: [JbankPage,FooterComponent,HeaderComponent],
  //entryComponents
})
export class JbankPageModule {}
