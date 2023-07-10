export interface IRes {
    code: number;
    result: {
        status: string;
        message: string;
        data?: any;
        links: {};
    };
}

export const createRes = (code: number, message: string, data?: any, links?: {}): IRes => {
    let status = "success";
    if (`${code}`.startsWith("4")) status = "fail";
    if (`${code}`.startsWith("5")) status = "error";
    if (!links) links = { docs: "https://doc.com/api" };

    return {
        code,
        result: {
            status,
            message,
            data,
            links,
        },
    };
};
