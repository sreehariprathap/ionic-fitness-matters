import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private toastService: HotToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    let apiReq = request.clone({
      url: `${environment.baseUrl}/${request.url}`,
    });
    apiReq = apiReq.clone({ headers: apiReq.headers.set('Accept', 'application/json') });
    if(accessToken){
      apiReq = apiReq.clone({ headers: apiReq.headers.set('authorization', `Bearer ${accessToken}`) });
    }
    return next.handle(apiReq);
  }

  private getFullUrl(url: string): string {
    const reqUrl = url;
    const apiBasePath = environment.baseUrl;
    return `${this.removeSlashes(apiBasePath)}/${this.removeSlashes(reqUrl)}`;
  }

  private readonly removeSlashes = (url: string): string => {
    if (!url) {
      return url;
    }
    if (url.startsWith('/')) {
      url = url.slice(1, url.length);
    }
    if (url.endsWith('/')) {
      url = url.slice(0, url.length - 1);
    }
    return url;
  };

  private subscribeError(error: any, request: any, next: any): Observable<any> {
    if (error.error.message) {
      this.toastService.error(error.error.message);
    }
    return observableThrowError(error);
  }
}
