import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import {Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(Leaders);
    // return new Promise<Leader[]>(resolve => {
    //   setTimeout(() => resolve(Leaders), 5000);
    // });
    return of(Leaders).pipe(delay(2000 ));
  }
  getLeader(id: number): Observable<Leader> {
   // return Promise.resolve(Leaders.filter( (l) => (l.id === id))[0]);
   // return Leaders.filter( (l) => (l.id === id))[0];
   //  return new Promise<Leader>(resolve => {
   //    setTimeout(() => resolve(Leaders.filter((l) => (l.id === id))[0]),
   //      5000);
   //  });
    return of(Leaders.filter((obj) => (obj.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
   // return Promise.resolve(Leaders.filter( (l) => (l.featured))[0]);
   //  return new Promise<Leader>(resolve => {
   //    setTimeout(() => resolve(Leaders.filter((l) => (l.featured))[0]),
   //      5000);
   //  });
    return of(Leaders.filter((obj) => (obj.featured === true))[0]).pipe(delay(2000));
  }
}
