import React, { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment, { Props as NewCommentProps } from './NewComment';
import styles from './Comments.module.scss';

import NotificationContext from '../../store/notificationContext';

type Props = {
  eventId: string;
};

const Comments: React.FC<Props> = ({ eventId }) => {
  const [submissionTime, setSubmissionTime] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (!showComments) return;

    setIsFetchingComments(true);

    fetch(`/api/comments/${eventId}`)
      .then(response => response.json())
      .then(data => {
        if (!data.data.comments) throw 'No data';
        setComments(data.data.comments);
        setIsFetchingComments(false);
      })
      .catch(err => {
        console.error(err);
        setIsFetchingComments(false);
      });
  }, [showComments, submissionTime]);

  const toggleCommentsHandler = () =>
    setShowComments(prevStatus => !prevStatus);

  const addCommentHandler: NewCommentProps['onAddComment'] =
    async commentData => {
      notificationCtx.showNotification({
        status: 'pending',
        title: 'Pending',
        message: 'Saving comment',
      });

      // send data to API
      try {
        const response = await fetch(`/api/comments/${eventId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentData),
        });

        const data = await response.json();

        if (!response.ok) throw data.message;

        notificationCtx.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Comment is saved',
        });

        setSubmissionTime(Date.now());
      } catch (err: any) {
        console.error(err);
        notificationCtx.showNotification({
          status: 'error',
          title: 'Error',
          message: err || 'Something went wrong!',
        });
      }
    };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading comments...</p>}
    </section>
  );
};

export default Comments;
