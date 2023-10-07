import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-pending-trip',
  templateUrl: './pending-trip.component.html',
  styleUrls: ['./pending-trip.component.scss'],
})
export class PendingTripComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

}
