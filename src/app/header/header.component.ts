import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin=false;
  constructor() { }

  ngOnInit(): void {
  }
  logfun(){
    if(this.loggedin==false){
      this.loggedin=true;
    }else{this.loggedin=false}
  }
}
