import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JournalsPageRoutingModule } from './journals-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JournalsPage } from './journals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    IonicModule,
    JournalsPageRoutingModule
  ],
  declarations: [JournalsPage,FooterComponent,HeaderComponent],
  entryComponents: [FooterComponent,HeaderComponent]
})
export class JournalsPageModule {}
