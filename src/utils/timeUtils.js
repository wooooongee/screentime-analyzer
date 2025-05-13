/**
 * 시간 관련 유틸리티 함수들
 */

// 시간을 "HH:MM" 형식으로 포맷팅
export const formatTime = (date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

// 날짜를 "YYYY-MM-DD" 형식으로 포맷팅
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// 오늘 날짜 가져오기
export const getTodayDate = () => {
  return formatDate(new Date());
};

// 분 단위 시간을 "시간 분" 형식으로 변환
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}시간 ${mins}분`;
  }
  return `${mins}분`;
};

// 시간대 중첩 확인
export const isTimeOverlapping = (start1, end1, start2, end2) => {
  return (start1 < end2 && end1 > start2);
};