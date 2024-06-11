import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userService } from '../services/users/user.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(userService);
  const router = inject(Router)
  if(!backendService.isLoggedIn){
    return router.createUrlTree(['/candidate/login']);
  }else{
    return true;
  }
};
