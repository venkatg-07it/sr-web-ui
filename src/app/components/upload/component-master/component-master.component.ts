import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-master',
  templateUrl: './component-master.component.html',
  styleUrls: ['./component-master.component.css']
})
export class ComponentMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";

}
