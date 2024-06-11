import { CanActivateFn, Router } from '@angular/router';
import { RecruiterService } from '../services/recruiter/recruiter.service';
import { inject } from '@angular/core';

export const recruiterAuthGuard: CanActivateFn = (route, state) => {
  const backendService = inject(RecruiterService);
  const router = inject(Router)
  if(!backendService.isLoggedIn){
    return router.createUrlTree(['/recruiter/login']);
  }else{
    return true;
  }
};
