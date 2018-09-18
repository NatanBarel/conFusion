import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService, private restangular: Restangular) { }
  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true});
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error ));
  }
}
