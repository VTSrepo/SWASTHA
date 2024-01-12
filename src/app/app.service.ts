import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AppService {
  private loadingSubject = new BehaviorSubject(false);
  public loadingSubObs = this.loadingSubject.asObservable();
  public loaderSub = new Subject();
  setLoading(state: boolean) {
    this.loadingSubject.next(state);
  }
}
