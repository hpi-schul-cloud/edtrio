import { getCookie } from "~/utils/cookie"

export const jwt = (getCookie("jwt").startsWith("Bearer ") ? "" : "Bearer ") + getCookie("jwt");