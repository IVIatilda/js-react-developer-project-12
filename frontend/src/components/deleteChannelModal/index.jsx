import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannel, actions as channelsActions } from '../../slices/channelsSlice';

const DeleteChannelModal = ({ show, channelId, onHide }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteChannel = () => {
    dispatch(removeChannel(channelId));
    dispatch(channelsActions.removeChannel(channelId));
    onHide();
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">{t('channels.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('texts.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2 btn" onClick={onHide}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" type="submit" onClick={deleteChannel}>
            {t('buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
