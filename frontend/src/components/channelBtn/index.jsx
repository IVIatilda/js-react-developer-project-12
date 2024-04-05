import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DeleteChannelModal from '../deleteChannelModal';
import { actions as uiActions } from '../../slices/uiSlice';

const ChannelBtn = ({ channel, editChannel }) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectedChannel = useSelector((state) => state.ui.selectedChannel);

  const selectChat = () => {
    dispatch(uiActions.setSelectedChannel(channel.id));
  };

  return (
    <>
      {channel.removable ? (
        <Dropdown className="d-flex btn-group">
          <Button
            variant={selectedChannel === channel.id && 'secondary'}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={selectChat}
            type="button"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            as={Button}
            variant={selectedChannel === channel.id && 'secondary'}
            className="rounded-right"
          >
            <span className="visually-hidden">{t('channels.settings')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              {t('buttons.delete')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                editChannel(channel);
              }}
            >
              {t('buttons.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={selectedChannel === channel.id && 'secondary'}
          className="w-100 rounded-0 text-start"
          onClick={selectChat}
          type="button"
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

export default ChannelBtn;
