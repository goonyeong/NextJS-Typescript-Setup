import { observable, action, makeObservable } from "mobx";

interface IUser {
  name: string;
  isSignin: boolean;
}

export class UserStore {
  user: IUser = {
    name: "",
    isSignin: false,
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      signIn: action,
      signOut: action,
    });
  }

  signIn = (name: string) => {
    this.user = {
      name: name,
      isSignin: true,
    };
  };

  signOut = () => {
    this.user = {
      name: "",
      isSignin: false,
    };
  };
}
