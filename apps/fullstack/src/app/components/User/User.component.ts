import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState, selectAuthState } from '../../store/app.states';
import { GetUser, Logout, ResetStore } from '../../store/actions/auth.actions';
import { IState } from '../../store/reducers/auth.reducer';


export interface UserList {
  id: string;
  name: string;
  email: string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css'],
})

export class User implements OnInit {

  UserData: UserList[] | any
  state: any;
  error: any;
  constructor(private store: Store<IAppState>) {
    this.state = this.store.select(selectAuthState);

  }
  ngOnInit() {
    this.store.dispatch(new ResetStore());
    const payload = {
      token: localStorage.getItem('token')
    };
    this.store.dispatch(new GetUser(payload));
    this.state.subscribe((s: IState) => {
      this.UserData = s.userList;
      this.error = s.error;
    })
  }

  displayedColumns: string[] = ['id', 'name', 'email'];

  handleLogout() {
    this.store.dispatch(new Logout);
  }
}