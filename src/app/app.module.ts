import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { WatchedListComponent } from './watched-list/watched-list.component';
import { RegisterAnimationDataComponent } from './register-animation-data/register-animation-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WatchedListComponent,
    RegisterAnimationDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
