export type Product = {
    id: number,
    title: string,
    vendor: string,
    tags: string[],
    published: boolean,
    url: string,
    image_src: string,
    option_valu: string,
    sku: string,
    price: string,
    subscription_discount: number,
    subscription: boolean,
    option_value: boolean
};

export type User = {
    id: number,
    username: string,
    email: string,
};
