import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Products } from 'src/app/models/produto';

export interface State {
    store: Products[]
}
export interface Wish {
  wish: Products[]
}

export interface WishRemove {
  wishRemove: Products[]
}

const state: State = {
  store: [],
};

const wish: Wish = {
  wish: [],
};

const wishRemove: WishRemove = {
  wishRemove: [],
};

export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable();

    private subjectWish = new BehaviorSubject<Wish>(wish);
    private wish = this.subjectWish.asObservable();

    private subjectWishRemove = new BehaviorSubject<WishRemove>(wishRemove);
    private wishRemove = this.subjectWishRemove.asObservable();

    get value() {
        return this.subject.value;
    }

    get valueWish() {
      return this.subjectWish.value;
    }

    get valueWishRemove() {
      return this.subjectWishRemove.value;
    }

    public getProduct(): Observable<Products[]> {
      return this.store
          .pipe(map(store => store.store));
    }

    public getWish(): Observable<Products[]> {
      return this.wish
          .pipe(map(wish => wish.wish));
    }

    public getWishRemove(): Observable<Products[]> {
      return this.wishRemove
          .pipe(map(wishRemove => wishRemove.wishRemove));
    }

    set(name: string, state: any) {
        this.subject.next({
            ...this.value, [name]: state
        });
    }

    setWish(name: string, wish: any) {
      this.subjectWish.next({
          ...this.valueWish, [name]: wish
      });
    }

    setWishRemove(name: string, wish: any) {
      this.subjectWishRemove.next({
          ...this.valueWishRemove, [name]: wish
      });
    }

}
