import { createContext, useContext } from "react";
import { ThemeStore } from "./themeStore";
import { UserStore } from "./userStore";

export class RootStore {
  themeStore: ThemeStore;
  userStore: UserStore;

  constructor() {
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
