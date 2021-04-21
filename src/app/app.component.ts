import { Component } from '@angular/core';
import { AnimationsList } from './shared/animationsList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public allAnimationsList: AnimationsList = [];
  public firstClick = true;
  
  constructor() {}

  ngOnInit(): void {}

  // DBから一覧取得
  public async getAnimationsListFromDb(): Promise<void> {
    let getAnimationsFromDb;
    await fetch("https://9em5xmiqj0.execute-api.ap-northeast-1.amazonaws.com/develop")
      .then(function(response) {
        return response.json()
      }).then(function (myJson) {
        getAnimationsFromDb = myJson;
      }).catch(function(error) {
        console.log(error);
      });
    
    for (let i = 0; i < getAnimationsFromDb.Items.length; i++) {
      this.allAnimationsList.push(getAnimationsFromDb.Items[i]);
    }
    // DBアクセスボタンを連打されないように、一度押したら非活性にする
    this.firstClick = false;
  }

  // 登録後にregisterAnimationDataComponentからアニメリストを受け取る
  public receiveAnimationListFromChild(updatedAllAnimationsList: AnimationsList) {
    this.allAnimationsList = updatedAllAnimationsList;
  }
}
