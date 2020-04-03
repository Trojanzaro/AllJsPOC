import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component'; 
import { SignupFormComponent} from './signup-form/signup-form.component';

const routes: Routes = [
{
	path:'login-form',
	component: LoginFormComponent
}
,
{
	path:'signup-form',
	component: SignupFormComponent

},
{
	path:'',
	component: LoginFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
