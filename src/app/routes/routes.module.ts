import { UserLoggedInGuard } from './../route-guards/user-loggedin-guard.service';
import { AdminAuthGuard } from './../route-guards/admin-auth-guard.service';
import { MyProfileComponent } from './../my-profile/my-profile.component';
import { AdminProductsComponent } from './../admin/admin-products/admin-products.component';
import { LoginComponent } from './../login/login.component';
import { CheckOutComponent } from './../check-out/check-out.component';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './../my-orders/my-orders.component';
import { HomeComponent } from './../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { SignUpComponent } from '../signup/signup.component';
import { AuthGuard } from '../route-guards/auth-guard.service';

const routes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [UserLoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UserLoggedInGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
