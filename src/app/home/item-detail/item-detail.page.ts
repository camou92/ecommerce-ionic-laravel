import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, UpperCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonThumbnail,
  IonImg,
  IonCard,
  IonLabel,
  IonText,
  IonSearchbar, IonButtons, IonBackButton, NavController, IonItem, IonFooter, IonButton, IonBadge
} from '@ionic/angular/standalone';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar,
    IonText,
    IonLabel,
    IonCard,
    IonImg,
    IonIcon,
    IonCol,
    IonRow,
    IonThumbnail,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    UpperCasePipe,

    RouterLink, IonButtons, IonBackButton, IonItem, IonFooter, IonButton, IonBadge]
})
export class ItemDetailPage implements OnInit, OnDestroy {

  id!: string;
  item: any;
  addToBag!: any;
  totalItems = 0;
  cartSub!: Subscription;
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private api = inject(ApiService);
  public cartService = inject(CartService);

  constructor() {}

  ngOnInit() {
    this.getItem();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        console.log(cart);
        this.totalItems = cart ? cart?.totalItem : 0;
      }
    });
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('check id: ', id);
    if (!id || id == '0') {
      this.navCtrl.back();
      return;
    }
    this.id = id;

    this.item = this.api.items.find((record: any) => record.id == id);
    console.log(this.item);
  }

  addItem() {
    const result = this.cartService.addQuantity(this.item);
    this.addedText();
  }

  addedText() {
    this.addToBag = 'Added to Bag';
    setTimeout(() => {
      this.addToBag = null;
    }, 1000);
  }

  ngOnDestroy(): void {
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}
