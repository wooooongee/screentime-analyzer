import React from 'react';
import ActivityChart from '../components/dashboard/ActivityChart';
import CategoryChart from '../components/dashboard/CategoryChart';
import ProductivitySummary from '../components/dashboard/ProductivitySummary';
import useTimeData from '../hooks/useTimeData';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { todayEntries } = useTimeData();
  
  return (
    <div className={styles.dashboard}>
      <h1>대시보드</h1>
      
      {todayEntries.length === 0 ? (
        <div className="card">
          <h2>오늘 기록된 활동이 없습니다</h2>
          <p>시간 입력 페이지에서 오늘의 활동을 기록해보세요.</p>
          <button onClick={() => window.location.href = '/entry'}>활동 기록하기</button>
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <ProductivitySummary timeEntries={todayEntries} />
          </div>
          
          <div className={styles.charts}>
            <div className={styles.chartCard}>
              <ActivityChart timeEntries={todayEntries} />
            </div>
            <div className={styles.chartCard}>
              <CategoryChart timeEntries={todayEntries} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;