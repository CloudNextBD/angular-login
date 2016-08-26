/**
 * Created by mrahman on 8/26/16.
 */

import {Component} from '@angular/core';
import {RouteConfig, RouterLink, Router} from '@angular/router-deprecated';
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";

@Component({
    // HTML selector for this component
    selector: 'auth-app',
    template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
    directives: []
})

@RouteConfig([
    // { path: '/', redirectTo: ['/Home'] },
    { path: '/home', component: HomeComponent, name: 'Home' },
    { path: '/login', component: LoginComponent, name: 'Login' }
])

export class NavigateComponent {
    constructor() {}
}