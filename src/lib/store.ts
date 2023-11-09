import { writable } from "svelte/store";
import { browser } from "$app/environment";

let storedStreak, storedLast;

if (browser) {
  storedStreak = parseInt(localStorage.streak);
  storedLast = parseInt(localStorage.last);
}

export const streak = writable(storedStreak || 0);
export const last = writable(storedLast || 0);
if (browser) {
  streak.subscribe((value) => (localStorage.streak = value));
  last.subscribe((value) => (localStorage.last = value));
}
