import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  url = environment.serverURL + '/hotelpackage';
  options = { responseType: 'text' as 'json' };

  constructor(
    private httpClient: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getItems(): Observable<any> {
    return this.httpClient.get<any[]>(this.url + '/list').pipe(
      tap(_ => console.log('item fetch successfull')),
      catchError(this.handleErrorService.handle('hotel package getList', []))
    );
  }
  
  saveItem(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url, data, this.options).pipe(
      tap(_ => console.log('item save successfull')),
      catchError(this.handleErrorService.handleError)
    );
  }

  putItem(id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(this.url + '/' + id, data, this.options).pipe(
      tap(_ => console.log('item edited successfull')),
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id, this.options).pipe(
      tap(_ => console.log('item deleted')),
      catchError(this.handleErrorService.handleError)
    );
  }
}
