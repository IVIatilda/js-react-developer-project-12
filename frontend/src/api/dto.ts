export interface UserLoginDto {
    username: string;
    password: string;
}

export interface Channel {
    id: string;
    name: string;
    removable: boolean;
}

export interface Message {
    id: string;
    body: string;
    channelId: string;
    username: string;
}
