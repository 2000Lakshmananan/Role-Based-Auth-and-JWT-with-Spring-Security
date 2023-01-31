import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_service/user.service';
import { SignupComponent } from './signup/signup.component';
import { RoleService } from './_service/role.service';
import { RolesComponent } from './roles/roles.component';
import { AdminDashboardComponent } from './_dashboard/admin-dashboard/admin-dashboard.component';
import { HrComponent } from './hr/hr.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './_service/product.service';
import { ProductsDashboardComponent } from './_dashboard/products-dashboard/products-dashboard.component';
import { ProductEditComponent } from './_edit/product/product-edit/product-edit.component';
import { ProductEntity } from './_class/product-entity';
import { ProductUserComponent } from './_dashboard/product-user/product-user.component';
import { ApprovalsComponent } from './_dashboard/approvals/approvals.component';
import { ProductInteraction } from './_class/product-interaction';
import { UserCardComponent } from './_dashboard/user-card/user-card.component';
import { NotificationsComponent } from './_dashboard/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SignupComponent,
    RolesComponent,
    AdminDashboardComponent,
    HrComponent,
    ProductsComponent,
    ProductsDashboardComponent,
    ProductEditComponent,
    ProductUserComponent,
    ApprovalsComponent,
    UserCardComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,
    RoleService,
    ProductService,
    ProductEntity,
    ProductInteraction
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
