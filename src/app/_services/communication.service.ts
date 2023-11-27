import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private searchDoneSource = new Subject<void>();

  searchDone$ = this.searchDoneSource.asObservable();

  triggerSearchDone() {
    this.searchDoneSource.next();
  }
}
