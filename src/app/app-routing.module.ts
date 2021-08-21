import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EventListComponent } from "./events/event-list/event-list.component";
import { EventCreateComponent } from "./events/event-create/event-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: EventListComponent },
  { path: "create", component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:eventId", component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
