import React, { useState } from 'react';
import useTimeData from '../hooks/useTimeData';
import { formatDate } from '../utils/timeUtils';

const TimeEntry = () => {
  const { addTimeEntry } = useTimeData();
  const [formData, setFormData] = useState({
    activity: '',
    category: 'neutral',
    startTime: `${formatDate(new Date())}T00:00`,
    endTime: `${formatDate(new Date())}T00:00`
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 시작 시간이 종료 시간보다 이후인지 확인
    if (formData.startTime >= formData.endTime) {
      alert('종료 시간은 시작 시간 이후여야 합니다.');
      return;
    }
    
    addTimeEntry(formData);
    
    // 폼 초기화
    setFormData({
      activity: '',
      category: 'neutral',
      startTime: formData.startTime,
      endTime: formData.endTime
    });
    
    alert('활동이 추가되었습니다!');
  };
  
  return (
    <div>
      <h1>활동 시간 입력</h1>
      
      <div className="card">
        <h2>새 활동 추가</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="activity">활동 이름</label>
            <input
              type="text"
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              placeholder="예: 이메일 확인, 유튜브 시청, 코딩 등"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="productive">생산적</option>
              <option value="neutral">중립적</option>
              <option value="distracting">산만함</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="startTime">시작 시간</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="endTime">종료 시간</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit">활동 추가</button>
        </form>
      </div>
    </div>
  );
};

export default TimeEntry;