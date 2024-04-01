import React from "react";
import { Channel, Message } from "../../api/dto";
import { useSelector } from "react-redux";

export const MessagesList = ({
    selectedChannel,
}: {
    selectedChannel: Channel;
}) => {
    const messages: Message[] = useSelector((state: any) =>
        Object.values(state.messages.entities as Message).filter(
            (message: Message) => message.channelId === selectedChannel.id
        )
    );
    console.log(messages);

    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {selectedChannel?.name}</b>
                </p>
                <span className="text-muted">{messages.length} сообщения</span>
            </div>
            <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
            >
                {messages.map((message: Message) => (
                    <div className="text-break mb-2">
                        <b>{message.username}</b>: {message.body}
                    </div>
                ))}
            </div>
        </>
    );
};
