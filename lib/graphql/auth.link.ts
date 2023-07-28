import { setContext} from "@apollo/client/link/context";

export type Token = "user" | "member" | "customer" | "global-customer" | "anonymous" | string;

export function SetUserToken(token: string) {
  localStorage.setItem("user-token", token);
}
export function ClearUserToken() {
  localStorage.removeItem("user-token");
}
export function GetUserToken() {
  return localStorage.getItem("user-token") || "";
}

export function SetMemberToken(token: string, storage = localStorage) {
  storage.setItem("member-token", token);
}
export function ClearMemberToken() {
  localStorage.removeItem("member-token");
}
export function GetMemberToken() {
  return localStorage.getItem("member-token") || "";
}

export function SetStaffToken(token: string, storage = localStorage) {
  storage.setItem("staff-token", token);
}
export function ClearStaffToken() {
  localStorage.removeItem("staff-token");
}
export function GetStaffToken() {
  return localStorage.getItem("staff-token") || "";
}

export function SetCustomerToken(token: string, shopCode: string) {
  localStorage.setItem((shopCode ? `${shopCode}-` : ``) + "customer-token", token);
}
export function GetCustomerToken(shopCode: string) {
  return localStorage.getItem((shopCode ? `${shopCode}-` : ``) + "customer-token") || "";
}
export function ClearCustomerToken(shopCode: string) {
  localStorage.removeItem((shopCode ? `${shopCode}-` : ``) + "customer-token");
}

export function GetAnonymousToken(shopCode: string) {
  return sessionStorage.getItem((shopCode ? `${shopCode}-` : ``) + "anonymous-token") || "";
}
export function ClearAnonymousToken(shopCode: string) {
  localStorage.removeItem((shopCode ? `${shopCode}-` : ``) + "anonymous-token");
}
export function SetAnonymousToken(token: string, shopCode: string) {
  sessionStorage.setItem((shopCode ? `${shopCode}-` : ``) + "anonymous-token", token);
}

export function GetIP() {
  return localStorage.getItem("user-ip") || "";
}
export function SetIP(ip: string) {
  return localStorage.setItem("user-ip", ip);
}

export function getCurrentToken() {
  let token;
  const pathname = location.pathname;

  if (pathname == "/shop" || pathname.startsWith("/shop/")) {
    token = GetMemberToken() || GetStaffToken();
  } else if (pathname == "/admin" || pathname.startsWith("/admin/")) {
    token = GetUserToken();
  } else {
    const shopCode = sessionStorage.getItem("shopCode");
    const customerToken = GetCustomerToken(shopCode as string);
    const anonymousToken = GetAnonymousToken(shopCode as string);
    token = customerToken || anonymousToken;
  }
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQU5PTllNT1VTIiwiX2lkIjoiNjRiNjM5OGFlNjM1YjEyNDA2YjM4NzdlIiwibWVtYmVySWQiOiI2NDc4NjFiYmQ5OWUxNzdlM2I3OGI3N2UiLCJ1c2VybmFtZSI6Iktow6FjaCB2w6NuZyBsYWkiLCJpYXQiOjE2ODk2NjM4ODIsImV4cCI6MTY5MjI1NTg4Mn0.sGBdmTzqkun7CMaxak0Hf1QjdFPhwDsUEZ4TZpE3NSQ"
  return token;
}

export const AuthLink = setContext((_, { headers, ...ctx }) => {
  // get the authentication token from local storage if it exists
  return new Promise((resolve) => {
    // let token = getCurrentToken();
    let token;
    switch (ctx?.token) {
      default:
        token = ctx?.token || getCurrentToken();
        break;
    }
    const ip = GetIP();
    const context = {
      headers: {
        ...headers,
        ...(token && token !== "undefined"
          ? {
              "x-token": token,
            }
          : {}),
        ...(ip && ip !== "undefined"
          ? {
              "x-forwarded-for": ip,
            }
          : {}),
      },
    };
    // return the headers to the context so httpLink can read them
    resolve(context);
  });
});
