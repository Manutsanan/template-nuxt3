import type { LoginRequest } from "@/models/auth.model";
import { client } from './httpClient';

export function login(payload: LoginRequest) {
   return client("/auth/login", {
      method: "POST",
      body: payload,
   });
}

export function logout() {
   return client("/auth/logout", {
      method: "POST",
   });
}