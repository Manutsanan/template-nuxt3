import { client } from './httpClient';

export function info(payload: any) {
   return client(`/web/account/info/${payload.id}`, { method: "GET" });
}

export function list(payload: any) {
   return client("/web/account/list", { method: "GET", params: payload });
}

export function create(payload: any) {
   return client("/web/account/create", {
      method: "POST",
      body: payload,
   });
}

export function update(payload: any) {
   return client("/web/account/update", {
      method: "PATCH",
      body: payload,
   });
}

export function changeStatus(payload: any) {
   return client("/web/account/change-status", {
      method: "PATCH",
      body: payload,
   });
}

export function destroy(payload: any) {
   return client(`/web/account/delete/${payload?.id}`, {
      method: "DELETE",
   });
}