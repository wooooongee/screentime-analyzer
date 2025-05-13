import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { getTodayDate } from '../utils/timeUtils';

/**
 * 시간 데이터 관리를 위한 커스텀 훅
 * @returns {Object} - 시간 데이터 관련 상태와 함수들
 */
function useTimeData() {
  const [timeEntries, setTimeEntries] = useLocalStorage('screentime-entries', []);
  
  // 오늘 데이터 필터링
  const todayEntries = useMemo(() => {
    const today = getTodayDate();
    return timeEntries.filter(entry => entry.date === today);
  }, [timeEntries]);
  
  // 새 항목 추가
  const addTimeEntry = (entry) => {
    setTimeEntries([...timeEntries, { 
      id: Date.now().toString(),
      date: getTodayDate(),
      ...entry 
    }]);
  };
  
  // 항목 삭제
  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
  };
  
  // 항목 수정
  const updateTimeEntry = (id, updatedEntry) => {
    setTimeEntries(timeEntries.map(entry => 
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    ));
  };
  
  // 특정 날짜의 항목 가져오기
  const getEntriesByDate = (date) => {
    return timeEntries.filter(entry => entry.date === date);
  };
  
  return {
    timeEntries,
    todayEntries,
    addTimeEntry,
    deleteTimeEntry,
    updateTimeEntry,
    getEntriesByDate
  };
}

export default useTimeData;
