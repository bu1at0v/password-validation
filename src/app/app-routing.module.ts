import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "**", redirectTo: "/sign-up", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
