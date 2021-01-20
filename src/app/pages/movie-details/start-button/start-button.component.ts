import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.css']
})
export class StartButtonComponent implements OnInit {
  @Input() filled:boolean;
  @Output() filledStartClick = new EventEmitter<VoidFunction>();
  @Output() emptyStartClick = new EventEmitter<VoidFunction>();
  constructor() { }

  ngOnInit() {
  }

  onEmptyStarClicked(){
    this.emptyStartClick.emit();
  }

  onFilledStartClicked(){
    this.filledStartClick.emit();
  }

}
