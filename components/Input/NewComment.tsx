import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styles from './NewComment.module.scss';

import { isValidEmail } from '../../utils/helpers';

type CommentData = {
  email: string;
  name: string;
  text: string;
};

export type Props = {
  onAddComment: (commentData: CommentData) => void;
};

const NewComment: React.FC<Props> = ({ onAddComment }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    const { id, value } = event.currentTarget;

    switch (id) {
      case 'email':
        setEmail(value);
        break;

      case 'name':
        setName(value);
        break;

      case 'text':
        setText(value);
        break;
    }
  };

  const handleFormSubmit: FormEventHandler = event => {
    event.preventDefault();

    const commentData = {
      email: email.trim(),
      name: name.trim(),
      text: text.trim(),
    };

    const invalidInput =
      !isValidEmail(commentData.email) ||
      !commentData.name ||
      !commentData.text;

    if (invalidInput) return setIsInvalid(true);

    onAddComment(commentData);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="text">Your comment</label>
        <textarea
          id="text"
          rows={5}
          value={text}
          onChange={handleInputChange}
          required
        />
      </div>
      {isInvalid && <p>Please enter a valid email address and/or comment!</p>}
      <button className={styles.btn} type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewComment;
