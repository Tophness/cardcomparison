import { Component, OnInit, OnDestroy } from '@angular/core';
import { cards } from '../comparisons/cards';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  subscription: Subscription;
  winners = [];
  compcards = [cards[0], cards[1]];
  limit = 5;
  sorted = cards;
  itemComponentClick(clickObj: any): void {
    this.getNextCard(clickObj.card);
  }
  getNextCard(clickedcard): void {
    if (this.winners.length <= this.limit) {
      let unclicked = this.sorted.indexOf(this.compcards[1]);
      if(this.compcards[0] == clickedcard){
        this.sorted[0].rating += 1;
        this.sorted[unclicked].rating -= 1;
      }
      else{
        this.sorted[0].rating -= 1;
        this.sorted[unclicked].rating += 1;
      }
      if (clickedcard.checkedAll.length >= this.sorted.length - 2) {
        this.winners.push(clickedcard);
        this.sorted = this.getFiltered(clickedcard, this.sorted);
      } else {
        this.sorted[this.sorted.indexOf(clickedcard)].checkedAll.push(this.sorted[unclicked].name);
      }
      this.sorted = this.sortCards(this.sorted);
      if (unclicked >= this.sorted.length - 1) {
        this.compcards[1] = this.sorted[1];
      }
      else {
        if (this.sorted[0].checkedAll.indexOf(this.sorted[unclicked+1].name) != -1) {
          let filtered = this.getFiltered2(this.sorted[0], this.sorted);
          filtered = this.getFiltered(this.sorted[0], filtered);
          if (filtered[0]) {
            this.compcards[1] = this.sorted[this.sorted.findIndex((i) => i.name == filtered[0].name)];
          }
        }
        else {
          this.compcards[1] = this.sorted[unclicked + 1];
        }
      }
      this.compcards[0] = this.sorted[0];
    } else {
      this.renderWinners(this.winners);
    }
  }
  sortCards(sortedb): any {
    sortedb = sortedb.sort(function (a, b) {
      return b.rating - a.rating;
    });
    return sortedb;
  }
  getFiltered(card, sortedb): any {
    sortedb = sortedb.filter(function (fcard) {
      return fcard.name !== card.name;
    });
    return sortedb;
  }
  getFiltered2(winner, sortedb): any {
    sortedb = sortedb.filter(function (fcard) {
      return winner.checkedAll.indexOf(fcard.name) == -1;
    });
    return sortedb;
  }
  renderWinners(winnerob): void {
    this.data.changeMessage(winnerob);
  }
  constructor(private data: DataService) {
  }
  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(winners => this.winners = winners);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
