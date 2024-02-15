import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
   public articles: Article[] = [];
   @ViewChild( IonInfiniteScroll, { static: true } ) infiniteScroll = {} as IonInfiniteScroll;

  constructor(private newService: NewsService) {}
  ngOnInit(){
      this.newService.getTopHeadLines()
      .subscribe(
        articles => this.articles.push(...articles)
      );
  }

  loadData(){
    this.newService.getTopHeadlinesByCategory('business', true)
    .subscribe( articles =>{

      if(articles.length === this.articles.length){
        this.infiniteScroll.disabled = true
        //event.target.disabled = true;
        return;
      }

      this.articles = articles;
      this.infiniteScroll.complete();
      //event.target.complete();

    })
  }
}
