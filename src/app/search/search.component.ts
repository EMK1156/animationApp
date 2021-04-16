import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimationsList } from '../dto/animationsList';
import { animationsList } from '../searchList'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  form = new FormControl();

  public searchedList = [];
  public isDisplayAllList = false
  public allAnimationsList: AnimationsList = [];
  public firstClick = true;
  public isAllowGetFromDb = true;
  // TODO: 後で消す
  public searchList;
  
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // TODO: 後で消す
    this.searchList = animationsList;
  }

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
  
  // タイトルから検索
  public onSearchByTitle(keyword: string) {
    // DアニメストアのURL使ってリンクにする場合使う
    // let parent = this.renderer.parentNode('resultZone');
    // this.renderer.removeChild(parent, 'a');

    // 検索結果リストを初期化
    this.searchedList = [];
    // 検索結果表示
    // TODO: 後で戻す
    this.searchList.forEach(animation => {
      if (animation.title.indexOf(keyword) != -1) {
        let searchedAnimation = `${animation.title}：${animation.season}`;
        this.searchedList.push(searchedAnimation);
      }
    });
  }
  
  // 放送時期から検索
  public onSearchBySeason(keyword: string) {
    // 検索結果リストを初期化
    this.searchedList = [];
    // 検索結果表示
    this.searchList.forEach(animation => {
      if (animation.season.indexOf(keyword) != -1) {
        let searchedAnimation = `${animation.title}：${animation.season}`;
        this.searchedList.push(searchedAnimation);
      }
    });
    return;
  }
  
  // 検索結果をリセット
  public onReset() {
    this.searchedList = [];
  }

}