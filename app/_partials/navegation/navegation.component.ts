import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss'],
})
export class NavegationComponent implements OnInit {


  ngOnInit() {}

  constructor(private router: Router) { }

  public Test(){
    console.log("history---");
    this.router.navigate(['/history'])
  }

  public Test2(){
    console.log("chat---");
    this.router.navigate(['/chats'])
  }
   
  public Test3(){
    console.log("setting---");
    this.router.navigate(['/setting'])
  } 
}
