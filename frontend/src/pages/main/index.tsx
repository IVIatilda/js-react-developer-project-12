import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesList } from "../../components/messagesList";
import { Channels } from "../../components/channels";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels, channelsSelectors } from "../../slices/channelsSlice";
import { fetchMessages } from "../../slices/messagesSlice";
import { MessagesForm } from "../../components/messagesForm";
import { AddChannelModal } from "../../components/addChannelModal";
import { Channel } from "../../api/dto";

export const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const channels: Channel[] = useSelector(
        channelsSelectors.selectAll
    ) as Channel[];

    const [modalShow, setModalShow] = React.useState(false);
    const [selectedChannel, setSelectedChannel] = React.useState(null);

    useEffect(() => {
        dispatch(fetchChannels());
        dispatch(fetchMessages());
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (channels && channels.length) {
            setSelectedChannel(channels[0]);
        }
    }, [channels]);

    return (
        <>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                        <Channels
                            items={channels}
                            selectedChannel={selectedChannel}
                            setSelectedChannel={setSelectedChannel}
                            addChannel={() => setModalShow(true)}
                        />
                    </div>
                    <div className="col p-0 h-100">
                        <div className="d-flex flex-column h-100">
                            <MessagesList selectedChannel={selectedChannel} />
                            <div className="mt-auto px-5 py-3">
                                <MessagesForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddChannelModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};
