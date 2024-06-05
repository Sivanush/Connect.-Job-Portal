import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserBackendService } from '../services/users/user-backend.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(UserBackendService);
  const router = inject(Router)
  if(!backendService.isLoggedIn){
    return router.createUrlTree(['/candidate/login']);
  }else{
    return true;
  }
};
