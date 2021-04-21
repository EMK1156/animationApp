import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnimationsList } from '../shared/animationsList';
import { newAnimationsList } from '../searchList';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @Input() allAnimationsList: AnimationsList;

  public searchedList: AnimationsList = [];
  public isSearch = false;
  public dataSource;

  columnsToDisplay = ['title', 'season', 'category', 'part', 'recorder'];
  
  constructor() {}

  ngOnInit(): void {}
  
  // タイトルから検索
  public onSearch(title?: string, season?: string, category?: string, part?: string, recorder?: string) {
    this.isSearch = true;
    // 検索結果リストを初期化
    let filteredAnimations = this.allAnimationsList

    // 検索条件から絞り込み
    if (title){
      filteredAnimations = filteredAnimations.filter(animation => animation.title.indexOf(title) != -1);
    }
    if (season){
      filteredAnimations = filteredAnimations.filter(animation => animation.season.indexOf(season) != -1);
    }
    if (category){
      filteredAnimations = filteredAnimations.filter(animation => animation.category.indexOf(category) != -1);
    }
    if (part){
      filteredAnimations = filteredAnimations.filter(animation => animation.part === part);
    }
    if (recorder){
      filteredAnimations = filteredAnimations.filter(animation => animation.recorder === recorder);
    }
    // 検索結果をテーブル用のデータに変換
    this.dataSource = new MatTableDataSource(filteredAnimations);
  }
  
  // 検索結果をリセット
  public onReset() {
    this.isSearch = false;
  }

  // 登録後にregisterAnimationDataComponentからアニメリストを受け取る
  public receiveAnimationListFromChild(updatedAllAnimationsList: AnimationsList) {
    this.allAnimationsList = updatedAllAnimationsList;
  }
}