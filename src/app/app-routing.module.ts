import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrinksComponent } from './add-drinks/add-drinks.component';
import { AuthGuard } from './authguard/auth.guard';
import { ListDrinksComponent } from './list-drinks/list-drinks.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  {path: 'add-drinks', component: AddDrinksComponent},
  {path: 'list-drinks', component: ListDrinksComponent},
  {path: '', redirectTo : '/login', pathMatch : 'full'},
  {path: '**', component : LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
