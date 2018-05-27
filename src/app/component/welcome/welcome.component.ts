import { Component, QueryList, ViewContainerRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IEmployee } from '../../shared/repo';

@Component({
  selector: 'app-root',
  templateUrl: 'welcome.component.html',
  styles: [`
  div {
      text-align: left;
  }
  a {
    cursor:pointer;
  }
  `]
})
export class WelcomeComponent {

  fullImagePath1: string;
  fullImagePath2: string;
  fullImagePath3: string;


  constructor(
    private resolver: ComponentFactoryResolver,
  ) {
    this.fullImagePath1 = 'src/assets/images/u.png';
    this.fullImagePath2 = 'src/assets/images/m.jpg';
    this.fullImagePath3 = 'src/assets/images/e.png';
  }
}
