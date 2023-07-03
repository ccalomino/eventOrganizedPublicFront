import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VinoComponent } from './vino/vino.component';


const routes: Routes = [
  { path: 'vino', component: VinoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
