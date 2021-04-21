import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimationsList } from '../shared/animationsList';

@Component({
  selector: 'app-register-animation-data',
  templateUrl: './register-animation-data.component.html',
  styleUrls: ['./register-animation-data.component.scss']
})
export class RegisterAnimationDataComponent implements OnInit {
  @Input() allAnimationsList: AnimationsList;
  @Output() returnUpdatedAllAnimationsList: EventEmitter<AnimationsList> = new EventEmitter();
  constructor() { }

  public isRegisterSuccess = false;
  public isExistAnimationData = false;

  ngOnInit(): void {}

  public async registerAnimationDataToDb(title: string, season?: string, category?: string, part?: string, recorder?: string) {
    // idを設定 & 登録済みかチェック
    let latestId = 0;
    this.allAnimationsList.forEach(animation => {
      if(animation.title === title) {
        alert("登録済みのアニメです");
        this.isExistAnimationData = true;
      }
      if(animation.id > latestId) latestId = animation.id;
    });
    latestId += 1;

    // DB登録用のAPI叩く 登録済みのデータだった場合は何もしない
    if(!this.isExistAnimationData) {
      let result;
      const url = "https://9em5xmiqj0.execute-api.ap-northeast-1.amazonaws.com/develop/"
      const data = {
        id: latestId,
        title: title,
        season: season,
        category: category,
        part: part,
        recorder: recorder
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
      if (result === null) {
        alert('登録成功');
        // 登録したデータをアニメリストに追加してsearchComponentに返す
        this.allAnimationsList.push(data);
        this.returnUpdatedAllAnimationsList.emit(this.allAnimationsList);
      }
    }
  }
}