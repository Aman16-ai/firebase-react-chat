import React from 'react';
import styles from './style/MessageCard.module.css';

const MessageCard = ({ message, sender, isReceiver }) => {
  const messageCardClass = isReceiver ? styles.receiver : styles.sender;

  return (
    <div className={`${styles['message-card']} ${messageCardClass}`}>
      <div className={styles['message-card__content']}>{message}</div>
      <div className={styles['message-card__sender']}>{sender}</div>
    </div>
  );
};

export default MessageCard;
