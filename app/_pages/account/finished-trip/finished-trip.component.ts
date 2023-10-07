import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-finished-trip',
  templateUrl: './finished-trip.component.html',
  styleUrls: ['./finished-trip.component.scss'],
})
export class FinishedTripComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
