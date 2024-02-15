import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces';

//plugins capacitor
import { Browser } from '@capacitor/browser';
/*
const openCapacitorSite = async () => {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};
*/

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  constructor( private platform: Platform,
               private actionSheetCtrl: ActionSheetController ) { }

  @Input() article = {} as Article;
  @Input() index = {} as number; 
  ngOnInit() {}

  
  async OpenArticle(){
    console.log("click");
    console.log('Plataform: ' + this.platform.is);
    if( this.platform.is('ios') || this.platform.is('android')){    
      await Browser.open({ url: this.article.url});
      return;
    } 
   
    window.open(this.article.url, '_blank');
  }

  async onOpenMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle()
          /*data: {
            action: 'delete',
          },*/
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite()
          
          /*data: {
            action: 'share',
          },*/
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          /*
          data: {
            action: 'cancel',
          },*/
        },
      ],
    });

    await actionSheet.present();
  }
  
  onShareArticle(){

  }

  onToggleFavorite(){

  }
  
  


  /*
  DEPRECATED
  OperArticle(){

    if( this.platform.is('ios') || this.platform.is('android')){
      const browser = this.iab.create( this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank' );

  }
  */
  
}
