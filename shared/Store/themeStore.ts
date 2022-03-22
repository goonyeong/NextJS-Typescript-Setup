import { observable, action, makeObservable } from "mobx";

export class ThemeStore {
  theme: string = "light";

  constructor() {
    makeObservable(this, {
      theme: observable,
      setTheme: action,
    });
  }

  setTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };
}
