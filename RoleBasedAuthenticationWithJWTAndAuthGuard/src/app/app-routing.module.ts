import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { HrComponent } from './hr/hr.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './roles/roles.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { AdminDashboardComponent } from './_dashboard/admin-dashboard/admin-dashboard.component';
import { ApprovalsComponent } from './_dashboard/approvals/approvals.component';
import { NotificationsComponent } from './_dashboard/notifications/notifications.component';
import { ProductUserComponent } from './_dashboard/product-user/product-user.component';
import { ProductsDashboardComponent } from './_dashboard/products-dashboard/products-dashboard.component';
import { UserCardComponent } from './_dashboard/user-card/user-card.component';
import { ProductEditComponent } from './_edit/product/product-edit/product-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard],data:{roles:["Admin"]} },
  { path: 'user', component: UserComponent, canActivate:[AuthGuard],data:{roles:["User"]}},
  { path : 'hr', component: HrComponent, canActivate:[AuthGuard],data:{roles:["HR"]}},
  { path: 'role', component: RolesComponent, canActivate: [AuthGuard],data:{roles:["Admin"]}},
  { path: 'product', component: ProductsComponent, canActivate: [AuthGuard],data:{roles:["Admin"]}},
  { path: 'products', component: ProductsDashboardComponent, canActivate: [AuthGuard],data:{roles:["Admin"]}},
  { path: 'approvals', component: ApprovalsComponent, canActivate: [AuthGuard],data:{roles:["Admin"]}},
  { path: 'productedit/:product', component: ProductEditComponent, canActivate: [AuthGuard],data:{roles:["Admin"]}},
  { path: 'login', component: LoginComponent },
  { path: 'userproduct', component: ProductUserComponent, canActivate:[AuthGuard],data:{roles:["User"]}},
  { path: 'usercard', component: UserCardComponent, canActivate:[AuthGuard],data:{roles:["User"]}},
  { path: 'notification', component: NotificationsComponent, canActivate:[AuthGuard],data:{roles:["User"]}},
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  {path: '**', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
