import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>대시보드</h1>
      <div className="card">
        <h2>오늘의 활동 요약</h2>
        <p>여기에 차트와 활동 요약이 표시됩니다.</p>
      </div>
    </div>
  );
};

export default Dashboard;