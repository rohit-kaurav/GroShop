import { AdminAuthGuard } from './route-guards/admin-auth-guard.service';
import { AuthGuard } from './route-guards/auth-guard.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RoutesModule } from './routes/routes.module';
import { MdComponentsModule } from './md-components/md-components.module';
import { TestService } from './services/test-service.service';
import { UserService } from './services/user.service';
import { SignUpComponent } from './signup/signup.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserLoggedInGuard } from './route-guards/user-loggedin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    SignUpComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RoutesModule,
    MdComponentsModule
  ],
  providers: [
    TestService, 
    UserService,
    AuthGuard,
    AdminAuthGuard,
    UserLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
