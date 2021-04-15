import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-animation-data',
  templateUrl: './register-animation-data.component.html',
  styleUrls: ['./register-animation-data.component.scss']
})
export class RegisterAnimationDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public registerAnimationDataToDb(title: string, season: string) {
    console.log(title);
  }
}
