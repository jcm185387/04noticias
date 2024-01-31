import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators';

const apikey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(): Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        apiKey: apikey
      }
    }).pipe(
       map( ({articles}) => articles)
    );
  }
}
