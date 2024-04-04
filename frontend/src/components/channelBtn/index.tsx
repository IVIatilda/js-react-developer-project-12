import React from "react";
import { Channel } from "../../api/dto";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { DeleteChannelModal } from "../deleteChannelModal";
import { useDispatch, useSelector } from "react-redux";
import { actions as uiActions } from "../../slices/uiSlice";

export const ChannelBtn = ({
    channel,
    editChannel,
}: {
    channel: Channel;
    editChannel: (channel: Channel | null) => void;
}) => {
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const dispatch = useDispatch();

    const selectedChannel = useSelector(
        (state: any) => state.ui.selectedChannel
    );

    const selectChat = () => {
        dispatch(uiActions.setSelectedChannel(channel.id));
    };

    return (
        <>
            {channel.removable ? (
                <Dropdown className="d-flex btn-group">
                    <Button
                        variant={selectedChannel === channel.id && "secondary"}
                        className="w-100 rounded-0 text-start"
                        onClick={selectChat}
                    >
                        <span className="me-1">#</span>
                        {channel.name}
                    </Button>
                    <Dropdown.Toggle
                        as={Button}
                        variant={selectedChannel === channel.id && "secondary"}
                        className="rounded-right"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => {
                                setShowDeleteModal(true);
                            }}
                        >
                            Удалить
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                editChannel(channel);
                            }}
                        >
                            Переименовать
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Button
                    variant={selectedChannel === channel.id && "secondary"}
                    className="w-100 rounded-0 text-start"
                    onClick={selectChat}
                >
                    <span className="me-1">#</span>
                    {channel.name}
                </Button>
            )}
            <DeleteChannelModal
                show={showDeleteModal}
                channelId={channel.id}
                onHide={() => {
                    setShowDeleteModal(false);
                }}
            />
        </>
    );
};
