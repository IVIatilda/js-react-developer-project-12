import React, { useMemo } from "react";
import { Channel, Message } from "../../api/dto";
import { useSelector } from "react-redux";
import { messagesSelectors } from "../../slices/messagesSlice";

export const MessagesList = ({
    selectedChannel,
}: {
    selectedChannel: Channel;
}) => {
    const messages: Message[] = useSelector(
        messagesSelectors.selectAll
    ) as Message[];

    const selectedMessages = useMemo(() =>
        messages.filter(
            (message: Message) => message.channelId === selectedChannel?.id
        ), [messages, selectedChannel]
    );

    // const messages: Message[] = useSelector((state: any) =>
    //     Object.values(state.messages.entities as Message).filter(
    //         (message: Message) => message.channelId === selectedChannel.id
    //     )
    // );
    console.log('messages', messages);

    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {selectedChannel?.name}</b>
                </p>
                <span className="text-muted">{selectedMessages.length} сообщения</span>
            </div>
            <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
            >
                {selectedMessages.map((message: Message) => (
                    <div className="text-break mb-2">
                        <b>{message.username}</b>: {message.body}
                    </div>
                ))}
            </div>
        </>
    );
};
