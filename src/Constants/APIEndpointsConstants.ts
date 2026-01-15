export const API_ENDPOINTS_CONSTANTS = {
    ACCOUNT: {
        GET_SINGLE: "api/account",
        GET_CURRENT: "api/account",
        POST_REGISTER: "api/account/register",
        POST_LOGIN: "api/account/login",
        POST_REFRESH: "api/account/refresh",
        POST_LOGOUT: "api/account/logout"
    },
    PRODUCT: {
        GET_SINGLE: "api/product",
        GET_MULTIPLE: "api/product",
        POST_ADD: "api/product"
    },
    GENRE: {
        GET_ALL: "api/genre",
        POST_ADD: "api/genre"
    },
    PLATFORM: {
        GET_ALL: "api/platform",
        POST_ADD: "api/platform"
    },
    DEVELOPER: {
        GET_ALL: "api/developer",
        POST_ADD: "api/developer"
    },
    PUBLISHER: {
        GET_ALL: "api/publisher",
        POST_ADD: "api/publisher"
    },
    IMAGE: {
        GET_SINGLE: "api/image",
        POST_ADD: "api/image",
        POST_ADD_DEFAULT: "api/image/default"
    }
} as const;