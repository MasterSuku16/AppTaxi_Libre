import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-progress-trip',
  templateUrl: './progress-trip.component.html',
  styleUrls: ['./progress-trip.component.scss'],
})
export class ProgressTripComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {}

}
