import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService, private restangular: Restangular) { }

  submitFeedback(feedbackval: Feedback): Observable<Feedback> {
    return this.restangular.all('feedback').post(feedbackval);
  }
}
