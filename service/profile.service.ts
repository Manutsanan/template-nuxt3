import { client } from './httpClient';

export function info() {
   return client("/web/profile", { method: "GET" });
}

export function update(payload: any) {
   return client("/web/profile/update", {
      method: "PATCH",
      body: payload,
   });
}

export function changePassword(payload: any) {
   return client("/web/profile/change-password", {
      method: "PATCH",
      body: payload,
   });
}