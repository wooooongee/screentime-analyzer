import React, { useMemo } from 'react';
import { formatDuration } from '../../../utils/timeUtils';
import styles from './ProductivitySummary.module.scss';

const ProductivitySummary = ({ timeEntries }) => {
  // 시간과 점수 계산
  const summary = useMemo(() => {
    let totalTime = 0;
    let productiveTime = 0;
    let distractingTime = 0;
    let neutralTime = 0;
    
    timeEntries.forEach(entry => {
      const duration = (new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60);
      totalTime += duration;
      
      switch(entry.category) {
        case 'productive':
          productiveTime += duration;
          break;
        case 'distracting':
          distractingTime += duration;
          break;
        case 'neutral':
          neutralTime += duration;
          break;
        default:
          break;
      }
    });
    
    // 생산성 점수 계산 (생산적 시간 - 산만한 시간) / 총 시간 * 100
    const productivityScore = totalTime > 0 
      ? Math.round(((productiveTime - distractingTime) / totalTime) * 100)
      : 0;
    
    return {
      totalTime,
      productiveTime,
      distractingTime,
      neutralTime,
      productivityScore: Math.max(-100, Math.min(100, productivityScore)) // -100 ~ 100 사이로 제한
    };
  }, [timeEntries]);
  
  // 생산성 점수에 따른 배경색 결정
  const getScoreBackground = (score) => {
    if (score >= 50) return styles.excellent;
    if (score >= 20) return styles.good;
    if (score >= -20) return styles.neutral;
    if (score >= -50) return styles.poor;
    return styles.veryPoor;
  };
  
  // 생산성 점수에 따른 피드백 메시지
  const getFeedbackMessage = (score) => {
    if (score >= 50) return '매우 생산적인 하루였습니다!';
    if (score >= 20) return '생산적인 하루였습니다.';
    if (score >= -20) return '중립적인 하루였습니다.';
    if (score >= -50) return '산만한 활동이 많았습니다.';
    return '매우 산만한 하루였습니다. 내일은 더 나아질 거예요!';
  };
  
  return (
    <div className={styles.container}>
      <div className={`${styles.scoreCard} ${getScoreBackground(summary.productivityScore)}`}>
        <h3>오늘의 생산성 점수</h3>
        <div className={styles.score}>{summary.productivityScore}</div>
        <p className={styles.feedback}>{getFeedbackMessage(summary.productivityScore)}</p>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>총 기록 시간</div>
          <div className={styles.statValue}>{formatDuration(summary.totalTime)}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>생산적</div>
          <div className={styles.statValue}>{formatDuration(summary.productiveTime)}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>중립적</div>
          <div className={styles.statValue}>{formatDuration(summary.neutralTime)}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>산만함</div>
          <div className={styles.statValue}>{formatDuration(summary.distractingTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductivitySummary;