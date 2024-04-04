import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesList } from "../../components/messagesList";
import { Channels } from "../../components/channels";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchChannels,
    channelsSelectors,
    actions as channelsActions,
} from "../../slices/channelsSlice";
import {
    fetchMessages,
    actions as messagesActions,
} from "../../slices/messagesSlice";
import { MessagesForm } from "../../components/messagesForm";
import { AddChannelModal } from "../../components/addChannelModal";
import { Channel } from "../../api/dto";
import { io } from "socket.io-client";

export const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const channels: Channel[] = useSelector(
        channelsSelectors.selectAll
    ) as Channel[];

    const [modalShow, setModalShow] = useState(false);
    const [channelForRename, setChannelForRename] = useState(null);

    useEffect(() => {
        dispatch(fetchChannels());
        dispatch(fetchMessages());
    }, [dispatch]);

    const isAuth = useSelector((state: any) => state.user.token);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token && !isAuth) {
            navigate("/login");
        }
    }, [navigate, isAuth]);

    const socket = io({
        transports: ["websocket", "polling"],
    });

    useEffect(() => {
        function onConnect() {
            console.log("connected");
            socket.emit("confirmation");
        }

        socket.on("connect", onConnect);

        socket.on("newMessage", (newMessage) => {
            console.log(newMessage);
            dispatch(messagesActions.addMessage(newMessage));
            socket.emit("confirmation");
        });

        socket.on("newChannel", (newChannel) => {
            dispatch(channelsActions.addChannel(newChannel));
            socket.emit("confirmation");
        });

        socket.on("removeChannel", (payload) => {
            const { id } = payload;
            dispatch(channelsActions.removeChannel(id));
            socket.emit("confirmation");
        });

        socket.on("renameChannel", (channel) => {
            dispatch(channelsActions.updateChannel(channel));
            socket.emit("confirmation");
        });

        return () => {
            socket.off("connect", onConnect);
        };
    }, [dispatch, socket]);

    const editChannel = (channel: Channel | null) => {
        setChannelForRename(channel);
        setModalShow(true);
    };

    return (
        <>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                        <Channels items={channels} editChannel={editChannel} />
                    </div>
                    <div className="col p-0 h-100">
                        <div className="d-flex flex-column h-100">
                            <MessagesList />
                            <div className="mt-auto px-5 py-3">
                                <MessagesForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddChannelModal
                show={modalShow}
                channel={channelForRename}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};
