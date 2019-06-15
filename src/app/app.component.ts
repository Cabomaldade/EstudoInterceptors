import { Component } from '@angular/core';
import { HttpRequest, HttpXhrBackend } from '@angular/common/http';

import { HttpInterceptorHandler } from './interceptor-handler';
import { I1, I2 } from './interceptors';
import { Observable } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
    selector: 'my-app',
    template: `
        <div><h3>Response</h3>{{response | async | json}}</div>
        <button (click)="request()">Make request</button>`
    ,
})
export class AppComponent {
    response: Observable<any>;
    constructor(private backend: HttpXhrBackend) {}

    request() {
        const req = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1');
        const i1Handler = new HttpInterceptorHandler(this.backend, new I1());
        const i2Handler = new HttpInterceptorHandler(i1Handler, new I2());
        this.response = i2Handler.handle(req);
    }
}
