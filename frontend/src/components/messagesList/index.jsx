import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesSelectors } from '../../slices/messagesSlice';

const MessagesList = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);

  const selectedChannel = useSelector((state) => {
    const channel = state.channels.entities[state.ui.selectedChannel];
    return channel;
  });

  const selectedMessages = useMemo(
    () => messages.filter((message) => message.channelId === selectedChannel?.id),
    [messages, selectedChannel],
  );

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {selectedChannel?.name}
          </b>
        </p>
        <span className="text-muted">
          {t('texts.message.count', {
            count: selectedMessages.length,
          })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {selectedMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            :
            {' '}
            {message.body}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesList;
