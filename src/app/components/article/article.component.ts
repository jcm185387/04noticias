import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  constructor() { }

  @Input() article = {} as Article;
  @Input() index = {} as number; 
  ngOnInit() {}

}
