import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Promotions } from '../shared/promotions';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
  //  return Promise.resolve(Promotions);
  //   return new Promise<Promotion[]>(resolve => {
  //     setTimeout(() => resolve(Promotions), 5000);
  //   });
    return of(Promotions).pipe(delay(5000));
  }

  getPromotion(id: number): Observable<Promotion> {
   // return Promotions.filter((promo) => (promo.id === id))[0];
   // return Promise.resolve(Promotions.filter((p) => p.id === id)[0]);
   //  return new Promise<Promotion>(resolve => {
   //    setTimeout(() => resolve(Promotions.filter((p) => (p.id === id))[0]) , 5000);
   //  });
    return of(Promotions.filter((obj) => (obj.id === id))[0]).pipe(delay(5000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
   // return Promotions.filter((promotion) => promotion.featured)[0];
   // return Promise.resolve(Promotions.filter( (p) => p.featured)[0]);
   //  return new Promise<Promotion>(resolve => {
   //    setTimeout( () => resolve(Promotions.filter((p) => (p.featured === true))[0]),
   //      5000);
   //  });
    return of(Promotions.filter((obj) => (obj.featured === true))[0]).pipe(delay(5000));
  }
}
