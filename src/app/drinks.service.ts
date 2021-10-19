import { Injectable } from '@angular/core';
import { Drink } from './drinks.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DrinksService {
  private drinks: Drink[] = [];
  private drinksUpdated = new Subject<Drink[]>();

  constructor(private http: HttpClient) {}


  getDrinks() {
    this.http.get<{message: string, drinks: Drink[]}>('http://localhost:3000/api/drinks')
    .subscribe((drinkData)=>{
      this.drinks = drinkData.drinks;
      this.drinksUpdated.next([...this.drinks]);
    });
  }
  getDrinkUpdateListener() {
    return this.drinksUpdated.asObservable();
  }
  addDrink(dname: string, dprice: number, dcat: string, ddesc: string, dstatus: string){
    const drink: Drink = {d_name: dname, d_price: dprice, d_cat: dcat,  d_desc: ddesc, d_status: dstatus };
    this.drinks.push(drink);
    this.drinksUpdated.next([...this.drinks])
  }
}
