import { useEffect, useState } from 'react';
import styles from '../../styles/sass/components/layouts/Dashboard.module.scss';
import React from 'react';
import { getFromStorage } from '../../utils/storage';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [token, setToken] = useState();

  const router = useRouter();

  useEffect(() => {
    const jwt = getFromStorage('token');

    if (jwt.length < 1) {
      router.push('/login');
    }

    setToken(jwt);
  });
  return (
    <div className={styles.layout}>
      {React.cloneElement(children, { token: token })}
    </div>
  );
}
