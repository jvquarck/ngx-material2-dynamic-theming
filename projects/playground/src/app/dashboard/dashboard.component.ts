import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GRADIENTS } from 'projects/ngx-material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  gradients = GRADIENTS;

  constructor(public dialog: MatDialog) {
  }

}
