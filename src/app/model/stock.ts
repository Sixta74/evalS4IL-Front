import { Article } from './article';

export class Stock {
  id!: number;
  date!: Date;
  article!: Article;
  quantity!: number;
  transferType!: string;
  comment!: string;

  constructor(
    date: Date,
    quantity: number,
    transferType: string,
    comment: string
  ) {
    this.date = date;
    this.quantity = quantity;
    this.transferType = transferType;
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

  getArticle(): Article {
    return this.article;
  }

  setArticle(article: Article): void {
    this.article = article;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  getTransferType(): string {
    return this.transferType;
  }

  setTransferType(transferType: string): void {
    this.transferType = transferType;
  }

  getComment(): string {
    return this.comment;
  }

  setComment(comment: string): void {
    this.comment = comment;
  }
}
