import React from "react";
import { ChannelBtn } from "../channelsList";
import { Channel } from "../../api/dto";
import { Button, Nav } from "react-bootstrap";

export const Channels = ({
    items,
    selectedChannel,
    setSelectedChannel,
    addChannel,
}: {
    items: Channel[];
    selectedChannel: Channel;
    setSelectedChannel: (channel: Channel) => void;
    addChannel: () => void;
}) => {
    return (
        <>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    variant="link"
                    className="p-0 btn btn-group-vertical"
                    onClick={addChannel}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                    >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                    </svg>
                </Button>
            </div>
            <Nav
                defaultActiveKey="/home"
                as="ul"
                className="flex-column px-2 mb-3 overflow-auto"
            >
                {items.map((item: Channel) => (
                    <Nav.Item key={item.id} as="li" onClick={() => setSelectedChannel(item)}>
                        <ChannelBtn btn={item} selected={selectedChannel?.id} />
                    </Nav.Item>
                ))}
            </Nav>
        </>
    );
};
