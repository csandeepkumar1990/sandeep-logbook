import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MustMatchDirective } from './_helpers/must-match.directive';
import { TweetImgComponent } from './tweet-img/tweet-img.component';
import { FooterComponent } from './footer/footer.component';
import { InsulinComponent } from './insulin/insulin.component';
import { ActivityComponent } from './activity/activity.component';
import { CarbsComponent } from './carbs/carbs.component';
//import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DiabatesServicesComponent } from './diabates-services/diabates-services.component';
import { DiabetesGraphComponent } from './diabetes-graph/diabetes-graph.component';
import { GlucoseLevelComponent } from './glucose-level/glucose-level.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    InsulinComponent,
    ActivityComponent,
    CarbsComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    MustMatchDirective,
    TweetImgComponent,
    FooterComponent,
    DiabatesServicesComponent,
    DiabetesGraphComponent,
    GlucoseLevelComponent
  ],
  entryComponents: [DiabetesGraphComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ModalDialogModule.forRoot(),
    ReactiveFormsModule
   ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
