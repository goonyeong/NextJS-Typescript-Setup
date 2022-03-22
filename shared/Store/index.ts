import { createContext, useContext } from "react";
import { ThemeStore } from "./themeStore";
import { AsyncTrunk } from "mobx-sync";

export class RootStore {
  themeStore: ThemeStore;

  constructor() {
    this.themeStore = new ThemeStore();
  }
}

export const rootStore = new RootStore();

// export const trunk = new AsyncTrunk(rootStore, {
//   storage: localStorage,
// });

export const StoreContext = createContext(rootStore);

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
