import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

const Button: React.FC<{
  link?: string;
  btnType?: 'submit' | 'reset' | 'button' | undefined;
}> = ({ children, link, btnType }) => {
  if (!link)
    return (
      <button type={btnType} className={styles.btn}>
        {children}
      </button>
    );

  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
};

export default Button;
