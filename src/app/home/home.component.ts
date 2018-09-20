import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService , private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dishes => this.dish = dishes[0],
        errmess => {this.dishErrMsg = <any>errmess.message; console.log(errmess); });
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotions => this.promotion = promotions[0],
        errmess => this.promoErrMsg = <any>errmess.message);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leaders => this.leader = leaders[0],
        errmess => this.leaderErrMsg = <any>errmess.message);
  }

}
