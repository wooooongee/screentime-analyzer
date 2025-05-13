import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { convertTimeDataToChartData, getCategoryColor } from '../../../utils/chartUtils';
import styles from './ActivityChart.module.scss';

const ActivityChart = ({ timeEntries }) => {
  const chartData = convertTimeDataToChartData(timeEntries);
  
  return (
    <div className={styles.chartContainer}>
      <h3>시간대별 활동</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 12 }} 
            interval={3} // 3시간 간격으로 라벨 표시
          />
          <YAxis 
            tickFormatter={(value) => `${Math.round(value * 60)}분`} 
          />
          <Tooltip 
            formatter={(value, name) => [`${Math.round(value * 60)}분`, name === 'productive' ? '생산적' : name === 'neutral' ? '중립적' : '산만함']}
            labelFormatter={(label) => `${label} 시간대`}
          />
          <Legend 
            formatter={(value) => value === 'productive' ? '생산적' : value === 'neutral' ? '중립적' : '산만함'} 
          />
          <Bar 
            dataKey="productive" 
            stackId="a" 
            fill={getCategoryColor('productive')} 
            name="productive" 
          />
          <Bar 
            dataKey="neutral" 
            stackId="a" 
            fill={getCategoryColor('neutral')} 
            name="neutral" 
          />
          <Bar 
            dataKey="distracting" 
            stackId="a" 
            fill={getCategoryColor('distracting')} 
            name="distracting" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;