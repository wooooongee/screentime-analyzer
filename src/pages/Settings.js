import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1>설정</h1>
      
      <div className="card">
        <h2>데이터 관리</h2>
        <button onClick={() => {
          if (window.confirm('모든 활동 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            localStorage.removeItem('screentime-entries');
            alert('모든 데이터가 삭제되었습니다.');
            window.location.reload();
          }
        }}>
          모든 데이터 초기화
        </button>
      </div>
      
      <div className="card">
        <h2>앱 정보</h2>
        <p>스크린타임 분석 웹앱 v1.0.0</p>
        <p>사용자의 기기별 생산성을 분석하는 웹 애플리케이션입니다.</p>
      </div>
    </div>
  );
};

export default Settings;