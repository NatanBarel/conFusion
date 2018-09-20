import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})

export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentsFormDirective;

  dish: Dish;
  dishcopy = null;
  errMess: string;
  dishIds: number[];
  prev: number;
  next: number;
  visibility = 'shown';
  commentForm: FormGroup;
  newComment: Comment;
  formErrors = {
    'author': '',
    'comment': '',
  };
  validationMessages = {
    'author': {
      'required': 'author Name is required.',
      'minlength': 'author Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'comment is required.',
      'maxlength': 'cooment cannot be more than 25 characters long.'
    },
  };

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); } ))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => { this.dish = null; this.errMess = <any>errmess; });

  }
  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      comment: ['', [Validators.required, Validators.maxLength(25)]],
      rating: ['' , [Validators.required]]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onSubmit() {
    this.newComment = this.commentForm.value;
    this.newComment.date = new Date().toISOString();
    this.dishservice.getDish(this.dish.id).subscribe( dish => {
      dish.comments.push(this.newComment);
      this.dishcopy = dish;
      this.dishcopy.save().subscribe(obj => {this.dish = obj; console.log(this.dish); });
      this.commentForm.reset({
        author: '',
        comment: '',
        rating: 5,
      });
    });
  }
  onValueChanged(data?: any) {
    this.newComment = data;
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
