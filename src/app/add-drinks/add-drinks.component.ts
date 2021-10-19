import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-drinks',
  templateUrl: './add-drinks.component.html',
  styleUrls: ['./add-drinks.component.css']
})
export class AddDrinksComponent implements OnInit {
  drinksForm = new FormGroup(
    {
      dname: new FormControl('', Validators.required),
      dprice: new FormControl(0, Validators.required),
      dcat: new FormControl('', Validators.required),
      ddesc: new FormControl('', Validators.required),
      actStatus: new FormControl('', Validators.required)
    }
  )
  pr = 0;
  i = 0;
  found = "n";
  s_val = null;
  menu = null;
  drinks = [];
  drinks_full = [];
  disp_table = 'n';
  temp = [];
  ctr = 1;
  name_asc = "y";
  price_asc = "y";
  edit_form = false;
  edit_index = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addNew() {
    if (this.edit_form) {
      if (this.drinks_full.length == this.drinks.length) {
        this.drinks[this.edit_index] = this.drinksForm.value;
        this.drinks_full[this.edit_index] = this.drinksForm.value;
        this.edit_form = false;
        this.edit_index = 0;
        this.drinksForm.reset();
      } else {
        this.drinks[0] = this.drinksForm.value;
        this.drinks_full[this.edit_index] = this.drinksForm.value;
        this.edit_form = false;
        this.edit_index = 0;
        this.drinksForm.reset();
      }
    } else {
      let duplicate = 0;
      if (this.drinks_full.length > 0) {
        this.drinks_full.forEach(drink => {
          if (drink.dname == this.drinksForm.value.dname) {
            duplicate++;
          }
        });
      }
      if (duplicate == 0) {
        this.drinks_full.push(this.drinksForm.value);
        this.reload();
        this.drinksForm.reset();
      } else {
        alert("Drink already exist")
      }
    }
  }
  del(drink: any) {
    if (this.drinks.length == this.drinks_full.length) {
      this.drinks.splice(this.drinks.indexOf(drink), 1);
      this.drinks_full.splice(this.drinks.indexOf(drink), 1);
    } else {
      this.drinks_full.forEach(d => {
        if (d.dname == drink.dname) {
          this.drinks_full.splice(this.drinks_full.indexOf(d), 1);
          this.drinks.splice(0, 1);
          alert("Drink deleted");
          this.drinksForm.reset();
          this.reload();
        }
      })
    }
  }
  edit(drink: any) {
    this.drinks_full.forEach(d => {
      if (d.dname == drink.dname) {
        this.edit_index = this.drinks_full.indexOf(d);
      }
    })
    this.edit_form = true;
    this.drinksForm.setValue(drink);
  }
  sortdrink() {
    if (this.name_asc == "y") {
      this.temp = [];
      this.ctr = 1;
      while (this.ctr < this.drinks.length) {
        if (this.drinks[this.ctr - 1].dname > this.drinks[this.ctr].dname) {
          this.temp = this.drinks[this.ctr - 1];
          this.drinks[this.ctr - 1] = this.drinks[this.ctr];
          this.drinks[this.ctr] = this.temp;
          this.ctr = 1;
        }
        else {
          this.ctr = this.ctr + 1;
        }
      } this.name_asc = "n"
    } else {
      this.temp = [];
      this.ctr = 1
      while (this.ctr < this.drinks.length) {
        if (this.drinks[this.ctr - 1].dname < this.drinks[this.ctr].dname) {
          this.temp = this.drinks[this.ctr - 1];
          this.drinks[this.ctr - 1] = this.drinks[this.ctr];
          this.drinks[this.ctr] = this.temp;
          this.ctr = 1;
        }
        else {
          this.ctr = this.ctr + 1;
        }
      } this.name_asc = "y"
    }
  }
  sortprice() {
    if (this.price_asc == "y") {
      this.temp = [];
      this.ctr = 1
      while (this.ctr < this.drinks.length) {
        if (this.drinks[this.ctr - 1].dprice > this.drinks[this.ctr].dprice) {
          this.temp = this.drinks[this.ctr - 1];
          this.drinks[this.ctr - 1] = this.drinks[this.ctr];
          this.drinks[this.ctr] = this.temp;
          this.ctr = 1;
        }
        else {
          this.ctr = this.ctr + 1;
        }
      } this.price_asc = "n"
    } else {
      this.temp = [];
      this.ctr = 1
      while (this.ctr < this.drinks.length) {
        if (this.drinks[this.ctr - 1].dprice < this.drinks[this.ctr].dprice) {
          this.temp = this.drinks[this.ctr - 1];
          this.drinks[this.ctr - 1] = this.drinks[this.ctr];
          this.drinks[this.ctr] = this.temp;
          this.ctr = 1;
        }
        else {
          this.ctr = this.ctr + 1;
        }
      } this.price_asc = "y"
    }
  }
  v_search() {
    if (this.menu == 'drink_name') {
      this.found = "n";
      this.drink_purge();
      this.drinks_full.forEach(d => {
        if (d.dname == this.s_val) {
          this.drinks.push(d);
          this.found = "y";
          this.s_val = '';
        }
      })
      if (this.found == "n") {
        {
          alert("Error! Drink name entered does not exist");
        }
      }
    } else if (this.menu == 'drink_price') {
      this.found = "n";
      this.pr = parseInt(this.s_val);
      this.drink_purge();
      this.drinks_full.forEach(d => {
        if (d.dprice == this.pr) {
          this.drinks.push(d);
          this.found = "y";
          this.s_val = '';
        }
      })
      if (this.found == "n") {
        {
          alert("Error! no match value entered!");
        }
      }
    }
  }
  reload() {
    if (this.drinks_full.length > 0) {
      this.i = 0;
      while (this.i < this.drinks_full.length) {
        this.drinks[this.i] = this.drinks_full[this.i];
        this.i = this.i + 1;
      }
    }
  }
  drink_purge() {
    while (this.drinks.length > 0) {
      this.drinks.pop();
    }
  }
}


