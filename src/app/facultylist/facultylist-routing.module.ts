import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultylistPage } from './facultylist.page';

const routes: Routes = [
  {
    path: '',
    component: FacultylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultylistPageRoutingModule {}
