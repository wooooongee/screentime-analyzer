import React, { useState } from 'react';
import useTimeData from '../hooks/useTimeData';
import { formatDate } from '../utils/timeUtils';

const History = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const { getEntriesByDate, deleteTimeEntry } = useTimeData();
  
  const dateEntries = getEntriesByDate(selectedDate);
  
  return (
    <div>
      <h1>활동 기록</h1>
      
      <div className="card">
        <h2>날짜 선택</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      
      <div className="card">
        <h2>{selectedDate} 활동 기록</h2>
        {dateEntries.length === 0 ? (
          <p>해당 날짜에 기록된 활동이 없습니다.</p>
        ) : (
          <ul>
            {dateEntries.map(entry => (
              <li key={entry.id}>
                {entry.startTime.substring(11, 16)} ~ {entry.endTime.substring(11, 16)}: {entry.activity} ({entry.category})
                <button onClick={() => deleteTimeEntry(entry.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;