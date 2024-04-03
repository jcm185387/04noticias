import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article [] = [];
  constructor(private storage: Storage) {
    this.init();
   }

   get getLocalArticles(){
    return [...this._localArticles];
   }


   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

   async saveRemoveArticle ( article: Article ){

    const exists = this._localArticles.find( localarticle => localarticle.title === article.title );
    if(exists){//existe  Se asigna a la variable todos los diferentes
      this._localArticles = this._localArticles.filter( localarticle  => localarticle.title != article.title )
    }else{
      //se asigna el nuevo artículo a la lista actual
      this._localArticles = [ article, ...this._localArticles ];
    }
    
    this._storage?.set('articles', this._localArticles);
   }

   async loadFavorites(){
    try{
      const articles = await this._storage?.get('articles');
      this._localArticles = articles  || [];
    }catch(error){

    }
   }
   articleInFavourites( article: Article ){
    return !!this._localArticles.find( localarticle => localarticle.title === article.title );
   }
}
