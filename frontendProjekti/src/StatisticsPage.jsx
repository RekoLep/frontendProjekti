import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import { getTrainings } from './TrainingsApi';

const StatisticsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchTrainings = async () => {
      try {
        const result = await getTrainings();

        
        const groupedData = _(result)
          .groupBy('activity')
          .map((items, activity) => ({
            activity,
            totalDuration: _.sumBy(items, 'duration'),
          }))
          .value();

        setData(groupedData);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Training Statistics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalDuration" fill="#8884d8" name="Total Duration (minutes)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsPage;
