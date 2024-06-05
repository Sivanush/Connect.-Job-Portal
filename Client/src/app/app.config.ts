import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { candidateRoute } from './routes/candidate.route';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { recruiterRoute } from './routes/recruiter.route';
import { sharedRoute } from './routes/shared.route';
import { adminRoute } from './routes/admin.route';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(candidateRoute),
    provideRouter(recruiterRoute),
    provideRouter(sharedRoute),
    provideRouter(adminRoute),
    provideClientHydration(),
    provideHttpClient(withFetch()), 
    provideToastr({
      closeButton: true,
      tapToDismiss: true,
      newestOnTop: true,
      easing: 'ease-in',
      toastClass: 'ngx-toastr',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), provideAnimationsAsync(),
  ]
};