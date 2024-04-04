import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators';
import { ArticlesByCategoryAndPage } from '../interfaces/index';

import { storedArticlesByCategory } from '../data/mock-news';

const apikey = environment.apikey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory;
  constructor(private http: HttpClient) {

    //console.log(this.articlesByCategoryAndPage);
   }

  private executeQuery<T>( endpoint: string ){
    console.log('Petición HTTP Realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apikey: apikey,
        country: 'us',
      }
    })
  }
  

  getTopHeadLines(): Observable<Article[]> {
    //console.log("business",this.getTopHeadlinesByCategory('business'));
    return this.getTopHeadlinesByCategory('business');
    // return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
    //   .pipe(
    //     map( ({ articles }) => articles )
    //   );

  }

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false ):Observable<Article[]> {
    //console.log(of(this.articlesByCategoryAndPage[category].articles));
    return of(this.articlesByCategoryAndPage[category].articles);

    if ( loadMore ) {
      return this.getArticlesByCategory( category );
    }

    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory( category );
   
  }

  private getArticlesByCategory( category: string ): Observable<Article[]> {

 

    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
      // this.articlesByCategoryAndPage[category].page += 0;
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles }) => {

        if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  

  }

}