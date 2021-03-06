import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import {SnackBarService} from '../../../shared/feedback/snackbar.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if not logged in
    if (!this.auth.isAdmin) {
      this.router.navigate(['sign-in']);
      this.snackBarService.showSnackBar('error', 'auth');
      return false;
    }

    // if logged in
    return true;
  }
}
