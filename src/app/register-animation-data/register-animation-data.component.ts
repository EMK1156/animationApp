import { Component, Input, OnInit } from '@angular/core';
import { AnimationsList } from '../dto/animationsList';

@Component({
  selector: 'app-register-animation-data',
  templateUrl: './register-animation-data.component.html',
  styleUrls: ['./register-animation-data.component.scss']
})
export class RegisterAnimationDataComponent implements OnInit {
  @Input() allAnimationsList: AnimationsList;
  constructor() { }

  public isRegisterResult = false;

  ngOnInit(): void {
  }

  public async registerAnimationDataToDb(title: string, season: string) {
    // idを設定
    let latestId = 0;
    this.allAnimationsList.forEach(animation => {
      if(Number(animation.id) > latestId) latestId = Number(animation.id);
    });
    latestId += 1;

    // DB登録用のAPI叩く
    let result;
    const url = "https://9em5xmiqj0.execute-api.ap-northeast-1.amazonaws.com/develop/"
    const data = {
      id: String(latestId),
      title: title,
      season: season
    };
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json()
    }).then(function (myJson) {
      result = myJson;
    }).catch(function(error) {
      console.log(error);
    });
    if (result === null) this.isRegisterResult = true;
  }
}