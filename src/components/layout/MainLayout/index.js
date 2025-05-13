import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <h1 className={styles.logo}>스크린타임 분석</h1>
        <ul className={styles.menu}>
          <li><Link to="/">대시보드</Link></li>
          <li><Link to="/entry">시간 입력</Link></li>
          <li><Link to="/history">기록 보기</Link></li>
          <li><Link to="/settings">설정</Link></li>
        </ul>
      </nav>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;