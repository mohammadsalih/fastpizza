import { redirect } from "react-router-dom";

import store from "../store/store";

export async function authLoader() {
  const state = store.getState(); // get the current Redux state
  const username = state.user.username;

  console.log(username);

  if (!username) {
    throw redirect("/"); // kicks user to home
  }

  return { username }; // pass username down if needed
}
