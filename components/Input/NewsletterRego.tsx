import styles from './NewsletterRego.module.scss';
import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from 'react';

import { isValidEmail } from '../../utils/helpers';
import NotificationContext from '../../store/notificationContext';
import AppError from '../../utils/appError';

const NewsletterRego = () => {
  const [email, setEmail] = useState('');
  const notificationCtx = useContext(NotificationContext);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    setEmail(event.currentTarget.value);
  };

  const registrationHandler: FormEventHandler = async event => {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    try {
      const enteredEmail = email.trim();

      if (!isValidEmail(enteredEmail)) throw 'Invalid Email Address';

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enteredEmail }),
      });

      const data = await response.json();

      if (!response.ok) throw data.message;

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'You are now signed up for newsletter',
        status: 'success',
      });
    } catch (err: any) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: err || 'Something went wrong!',
        status: 'error',
      });
    }
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRego;
