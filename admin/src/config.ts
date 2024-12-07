export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL || "";

export const API_LIST_URLS = {
    Services: {
        index: BASE_API_URL + "/api/services",
        one: BASE_API_URL + "/api/services/:id",
    },
    Contacts: {
        index: BASE_API_URL + "/api/contacts",
    },
};

export const LINK_STRUCTURE = {
    Index: APP_BASE_URL,
};
