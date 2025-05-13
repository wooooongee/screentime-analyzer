import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateCategoryPercentage, getCategoryColor } from '../../../utils/chartUtils';
import styles from './CategoryChart.module.scss';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0.05 ? (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CATEGORY_NAMES = {
  productive: '생산적',
  neutral: '중립적',
  distracting: '산만함'
};

const CategoryChart = ({ timeEntries }) => {
  const categoryData = calculateCategoryPercentage(timeEntries);
  
  return (
    <div className={styles.chartContainer}>
      <h3>활동 카테고리 비율</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`]}
            labelFormatter={(name) => CATEGORY_NAMES[name] || name}
          />
          <Legend 
            formatter={(value) => CATEGORY_NAMES[value] || value}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;