import { Component, Input, OnInit } from '@angular/core';
import { AnimationsList } from '../dto/animationsList.js';


@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {
  @Input() allAnimationsList: AnimationsList;

  public animationList = [];
  constructor() { }

  ngOnInit(): void {
    this.allAnimationsList.forEach(animation => {
      let animations = `${animation.title}：${animation.season}`;
      this.animationList.push(animations);
    });
  }

}
