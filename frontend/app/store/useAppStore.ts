import { defineStore } from 'pinia'
import type { AppState } from "~/interfaces/AppState";
import type {UserInterface} from "~/interfaces/UserInterface";
import type {TokenInterface} from "~/interfaces/TokenInterface";

export const useAppStore = defineStore('useAppStore', {
  state: (): AppState => ({
    app: {
      user: null,
      token: null,
    },
  }),
  persist: {
    pick: ['app.user', 'app.token'],
  },

  actions: {
    setUser(user: UserInterface | null): void {
      this.app.user = user
    },
    setToken(token: TokenInterface | null): void {
      this.app.token = token
    },
    logout(): void {
      this.app.user = null
      this.app.token = null
    },
  },

  getters: {
    getUser(state): UserInterface | null {
      return state.app.user
    },
    getToken(state: AppState): TokenInterface | null {
      return state.app.token
    }
  },
})
