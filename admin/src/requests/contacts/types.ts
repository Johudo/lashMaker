export type TContacts = {
    instagram: string;
    whatsapp: string;
    avito: string;
    yandexMap: string;
    phone: string;
};

export type TGetContactsResponseData = TContacts;

export type TEditContactsRequestData = Partial<TContacts>;
export type TEditContactsResponseData = TContacts;
