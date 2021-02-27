import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolleesComponent } from './enrollees/enrollees.component';

const routes: Routes = [
  { path: '', redirectTo: '/enrollees', pathMatch: 'full' },
  {
    path: 'enrollees',
    component: EnrolleesComponent,
    data: { breadcrum: 'Enrollees' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
