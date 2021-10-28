import { Component, OnInit, OnDestroy } from '@angular/core';
import { cards } from '../comparisons/cards';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  subscription: Subscription;
  winners: any;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(
      (winners) => (this.winners = winners)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
