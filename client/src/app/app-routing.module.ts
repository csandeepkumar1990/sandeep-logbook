import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TweetImgComponent } from './tweet-img/tweet-img.component';
import { InsulinComponent } from './insulin/insulin.component';
import { ActivityComponent } from './activity/activity.component';
import { CarbsComponent } from './carbs/carbs.component';
import { AuthGuard } from './auth.guard';
import { DiabatesServicesComponent } from './diabates-services/diabates-services.component';
import { GlucoseLevelComponent } from './glucose-level/glucose-level.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainComponent },
  // { path: 'services', canActivate:[AuthGuard], component: InsulinComponent },
  {
    path: 'services', canActivate: [AuthGuard], component: DiabatesServicesComponent,
    children: [
      { path: 'insulin', canActivate: [AuthGuard], component: InsulinComponent },
      { path: 'activity', canActivate: [AuthGuard], component: ActivityComponent },
      { path: 'carbs', canActivate: [AuthGuard], component: CarbsComponent },
      { path: 'glucose', canActivate: [AuthGuard], component: GlucoseLevelComponent }
    ]
  },
  { path: '*', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
