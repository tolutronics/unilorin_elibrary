import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { HomePageRoutingModule } from './home-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,FooterComponent,HeaderComponent,LoginDialogComponent,RegisterDialogComponent],
  entryComponents: [FooterComponent,HeaderComponent,LoginDialogComponent,RegisterDialogComponent],
})
export class HomePageModule {}
