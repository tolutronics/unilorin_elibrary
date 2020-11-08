import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,FooterComponent,HeaderComponent],
  entryComponents: [FooterComponent,HeaderComponent]
})
export class ProfilePageModule {}
