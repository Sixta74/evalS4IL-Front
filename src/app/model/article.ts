import { Category } from './category';
import { Stock } from './stock';

export class Article {
  id!: number;
  name!: string;
  EAN13!: string;
  brand!: string;
  picture_URL!: string;
  price!: string;
  description!: string;
  category!: Category;
  stocks!: Stock[];

  constructor(
    id: number,
    name: string,
    EAN13: string,
    brand: string,
    picture_URL: string,
    price: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.EAN13 = EAN13;
    this.brand = brand;
    this.picture_URL = picture_URL;
    this.price = price;
    this.description = description;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getEAN13() {
    return this.EAN13;
  }

  setEAN13(EAN13: string) {
    this.EAN13 = EAN13;
  }

  getPicture() {
    return this.picture_URL;
  }

  setPicture(picture_URL: string) {
    this.picture_URL = picture_URL;
  }
  getPrice() {
    return this.price;
  }

  setPrice(price: string) {
    this.price = price;
  }
  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }
  getCategory() {
    return this.category;
  }

  setCategory(category: Category) {
    this.category = category;
  }

  getStocks() {
    return this.stocks;
  }

  setStocks(stocks: Stock[]) {
    this.stocks = stocks;
  }
}
