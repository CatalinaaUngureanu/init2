import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class UnsubscribeCapableComponent implements OnDestroy {
  protected unsubscribed: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
    console.log("Destroyed component: ", this);
  }
}
