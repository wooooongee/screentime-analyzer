/**
 * 차트 관련 유틸리티 함수들
 */

// 시간 데이터를 차트 데이터로 변환
export const convertTimeDataToChartData = (timeEntries) => {
  // 24시간 기준 빈 데이터 초기화
  const hourlyData = Array(24).fill().map((_, index) => ({
    hour: index,
    label: `${index}:00`,
    productive: 0,
    neutral: 0,
    distracting: 0
  }));
  
  // 시간 데이터 집계
  timeEntries.forEach(entry => {
    const startHour = new Date(entry.startTime).getHours();
    const endHour = new Date(entry.endTime).getHours();
    const duration = (new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60 * 60);
    
    // 시작과 종료가 같은 시간대인 경우
    if (startHour === endHour) {
      hourlyData[startHour][entry.category] += duration;
    } else {
      // 시간대를 걸쳐 있는 경우, 시간을 분배
      for (let hour = startHour; hour <= endHour; hour++) {
        // 첫 시간과 마지막 시간은 부분적으로 할당
        if (hour === startHour) {
          const minutesInStartHour = 60 - new Date(entry.startTime).getMinutes();
          hourlyData[hour][entry.category] += minutesInStartHour / 60;
        } else if (hour === endHour) {
          const minutesInEndHour = new Date(entry.endTime).getMinutes();
          hourlyData[hour][entry.category] += minutesInEndHour / 60;
        } else {
          // 중간 시간은 1시간 전체 할당
          hourlyData[hour][entry.category] += 1;
        }
      }
    }
  });
  
  return hourlyData;
};

// 카테고리별 시간 비율 계산 (파이 차트용)
export const calculateCategoryPercentage = (timeEntries) => {
  const categories = {
    productive: 0,
    neutral: 0,
    distracting: 0
  };
  
  let totalTime = 0;
  
  timeEntries.forEach(entry => {
    const duration = (new Date(entry.endTime) - new Date(entry.startTime)) / (1000 * 60);
    categories[entry.category] += duration;
    totalTime += duration;
  });
  
  // 백분율 계산
  return Object.keys(categories).map(key => ({
    name: key,
    value: totalTime > 0 ? Math.round((categories[key] / totalTime) * 100) : 0
  }));
};

// 색상 매핑
export const getCategoryColor = (category) => {
  const colors = {
    productive: '#2ecc71', // 녹색
    neutral: '#3498db',    // 파란색
    distracting: '#e74c3c' // 빨간색
  };
  
  return colors[category] || '#95a5a6'; // 기본 색상
};