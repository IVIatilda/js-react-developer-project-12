import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeChannel, actions as channelsActions } from "../../slices/channelsSlice";

export const DeleteChannelModal = ({
    show,
    channelId,
    onHide,
}: {
    show: boolean;
    channelId: string;
    onHide: () => void;
}) => {
    const dispatch = useDispatch();

    const deleteChannel = () => {
        dispatch(removeChannel(channelId));
        dispatch(channelsActions.removeChannel(channelId));
        onHide();
    };

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить канал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
                <div className="d-flex justify-content-end">
                    <Button
                        variant="secondary"
                        className="me-2 btn"
                        onClick={onHide}
                    >
                        Отменить
                    </Button>
                    <Button
                        variant="danger"
                        type="submit"
                        onClick={deleteChannel}
                    >
                        Удалить
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
