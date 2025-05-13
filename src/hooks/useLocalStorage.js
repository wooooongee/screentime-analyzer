import { useState, useEffect } from 'react';

/**
 * localStorage를 사용하여 상태를 저장하고 관리하는 커스텀 훅
 * @param {string} key - localStorage에 저장될 키
 * @param {any} initialValue - 초기 값
 * @returns {Array} - [저장된 값, 값을 설정하는 함수]
 */
function useLocalStorage(key, initialValue) {
  // 저장된 값을 가져오거나 초기값 설정
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // localStorage에서 값 가져오기
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // storedValue가 변경될 때마다 localStorage 업데이트
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
