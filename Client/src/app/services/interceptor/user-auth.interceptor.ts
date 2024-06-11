import { HttpInterceptorFn } from '@angular/common/http';

export const userAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');
  if(token){
  console.log('chumma');
  }
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};
