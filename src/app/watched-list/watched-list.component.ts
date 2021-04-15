import { Component, OnInit } from '@angular/core';
import { animationsList } from "../searchList.js";

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.css']
})
export class WatchedListComponent implements OnInit {

  public animationList = [];
  constructor() { }

  ngOnInit(): void {
    animationsList.forEach(animation => {
      let animations = `${animation.title}：${animation.season}`;
      this.animationList.push(animations);
    });
  }

}
