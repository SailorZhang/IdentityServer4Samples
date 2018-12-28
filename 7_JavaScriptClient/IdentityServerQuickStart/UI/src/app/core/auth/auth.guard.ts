import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../services/DataService';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private service: DataService) { }

  canActivate(): Observable<boolean>|boolean {
    if (this.authService.handleAuthentication()) {
      return true;
    } else {
      return false;
    }
  }
}
