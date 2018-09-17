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

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService , private leaderserice: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(obj => this.dish = obj, errmsg => this.dishErrMsg = <any> errmsg);
    this.promotionservice.getFeaturedPromotion().subscribe(obj => this.promotion = obj);
    this.leaderserice.getFeaturedLeader().subscribe( obj => this.leader = obj);
  }

}
