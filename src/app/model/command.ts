import { Stock } from './stock';

export class Command {
  id!: number;
  date!: Date;
  stocks!: Stock[];
  comment!: string;

  constructor(date: Date, stocks: Stock[], comment: string) {
    this.date = date;
    this.stocks = stocks;
    this.comment = comment;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  setStocks(stocks: Stock[]): void {
    this.stocks = stocks;
  }

  getComment(): string {
    return this.comment;
  }

  setComment(comment: string): void {
    this.comment = comment;
  }
}
