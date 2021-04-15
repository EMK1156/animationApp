import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WatchedListComponent } from './watched-list/watched-list.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'watched', component: WatchedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
