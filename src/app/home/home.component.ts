import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
    // this.dishservice.getFeaturedDish().subscribe(obj => this.dish = obj[0], errmsg => this.dishErrMsg = <any> errmsg);
    // this.promotionservice.getFeaturedPromotion().subscribe(obj => this.promotion = obj[0]);
    // this.leaderserice.getFeaturedLeader().subscribe( obj => this.leader = obj);

    this.dishservice.getFeaturedDish()
      .subscribe(dishes => this.dish = dishes[0],
        errmess => this.dishErrMsg = <any>errmess.message);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotions => this.promotion = promotions[0],
        errmess => this.promoErrMsg = <any>errmess.message);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leaders => this.leader = leaders[0],
        errmess => this.leaderErrMsg = <any>errmess.message);

  }

}
