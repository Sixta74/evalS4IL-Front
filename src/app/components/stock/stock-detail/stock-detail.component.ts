import { Component, Input } from '@angular/core';
import { Stock } from '../../../model/stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
})
export class StockDetailComponent {
  @Input() stock!: Stock;
  public edit: boolean = false;
  public originalStock!: Stock;

  EditStock() {
    this.edit = !this.edit;
    if (this.edit) {
      this.originalStock = JSON.parse(JSON.stringify(this.stock));
    }
  }

  RevertStock() {
    this.stock = JSON.parse(JSON.stringify(this.originalStock));
    this.edit = false;
  }

  UpdateDate(event: Event) {
    this.stock.date = new Date((event.target as HTMLInputElement).value);
  }

  UpdateQuantity(event: Event) {
    this.stock.quantity = Number((event.target as HTMLInputElement).value);
  }

  UpdateTransferType(event: Event) {
    this.stock.transferType = (event.target as HTMLInputElement).value;
  }

  UpdateComment(event: Event) {
    this.stock.comment = (event.target as HTMLInputElement).value;
  }
}
