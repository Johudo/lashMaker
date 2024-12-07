export type TServicesItem = {
    id: number;
    title: string;
    priceMasterBefore: string;
    priceMasterCurrent: string;
    priceTopBefore: string;
    priceTopCurrent: string;
    sort: number;
};

export type TGetServicesResponseData = Array<TServicesItem>;

export type TCreateServiceItemRequestData = Omit<TServicesItem, "id">;
export type TCreateServiceItemResponseData = TServicesItem;

export type TEditServiceItemRequestData = Partial<TCreateServiceItemRequestData>;
export type TEditServiceItemResponseData = TCreateServiceItemResponseData;
