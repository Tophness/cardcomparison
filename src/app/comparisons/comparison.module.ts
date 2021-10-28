import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComparisonComponent } from './comparison.component';
import { CardComponent } from '../card/card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ComparisonComponent, CardComponent],
  exports: [ComparisonComponent, CardComponent]
})
export class ComparisonComponentModule {}
