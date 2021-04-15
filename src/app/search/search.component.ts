import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimationsList } from '../dto/animationsList';

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
  public isAllowGetFromDb = true;
  
  constructor(private renderer: Renderer2) {}

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
    this.isAllowGetFromDb = false;
  }
  
  // タイトルから検索
  public onSearchByTitle(keyword: string) {
    let parent = this.renderer.parentNode('resultZone');
    this.renderer.removeChild(parent, 'a');
    // 検索結果リストを初期化
    this.searchedList = [];
    // 検索結果表示
    this.allAnimationsList.forEach(animation => {
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
    this.allAnimationsList.forEach(animation => {
      if (animation.season.indexOf(keyword) != -1) {
        let searchedAnimation = `${animation.title}：${animation.season}`;
        this.searchedList.push(searchedAnimation);
      }
    });
    return;
  }

  // 一覧表示を制御
  public onDisplayAllList() {
    this.isDisplayAllList = true;
  }
  public onHiddenAllList() {
    this.isDisplayAllList = false;
  }
  
  // 検索結果をリセット
  public onReset() {
    this.searchedList = [];
  }

}