import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Drink } from '../drinks.model';
import { DrinksService } from "../drinks.service";

@Component({
  selector: 'app-list-drinks',
  templateUrl: './list-drinks.component.html',
  styleUrls: ['./list-drinks.component.css']
})
export class ListDrinksComponent implements OnInit, OnDestroy {
// OnInit is a life cycle hook provided by angular which will be
// executed automatically executes when it creates a component

 drinks: Drink[]=[];
 drinkSub: Subscription;

 constructor( public drinksService: DrinksService) {}

 ngOnInit() {
   this.drinksService.getDrinks();
   this.drinkSub = this.drinksService.getDrinkUpdateListener().subscribe((drinks: Drink[])=>{
     this.drinks=drinks;
   });
 }
 ngOnDestroy(){
   this.drinkSub.unsubscribe();
 }
}
