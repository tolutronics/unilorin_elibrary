import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JbankPage } from './jbank.page';

const routes: Routes = [
  {
    path: '',
    component: JbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JbankPageRoutingModule {}
