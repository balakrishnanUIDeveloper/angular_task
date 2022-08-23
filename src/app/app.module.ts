import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { DataProcessorComponent } from './home/data-processor/data-processor.component';
import { ModalComponent } from './shared/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/modal/modal.service';
import { RecordsComponent } from './home/records/records.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent,
    DataProcessorComponent,
    ModalComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule
  ],
  exports: [RouterModule],
  providers: [HomeService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
