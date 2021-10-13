import styles from './CommentList.module.scss';
import React from 'react';

type Comment = {
  eventId: string;
  id: string;
  email: string;
  name: string;
  text: string;
};

type Props = {
  comments: Comment[];
};

const CommentItem: React.FC<Comment> = ({ id, name, text }) => {
  return (
    <li>
      <p>{text}</p>
      <div>
        By <address>{name}</address>
      </div>
    </li>
  );
};

const CommentList: React.FC<Props> = ({ comments }) => {
  if (comments.length === 0) return null;

  return (
    <ul className={styles.comments}>
      {comments.map((comment, i) => (
        <CommentItem key={i} {...comment} />
      ))}
    </ul>
  );
};

export default CommentList;
