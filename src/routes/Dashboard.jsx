import supabase from '../supabase-client';
import { useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import Form from '../components/Form';

function Dashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics();


    const channel = supabase
      .channel('deal-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'sales_deals' 
        },
        payload => {
          console.log(payload);
          fetchMetrics();
        })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  async function fetchMetrics() {
    try {
      const { data, error } = await supabase
        .from('sales_deals')
        .select(
          `
          value.sum(),
          ...user_profiles!inner(
            name
          )
          `,
        );
      if (error) {
        throw error;
      }
     
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error.message);
    }
  }

  const chartData = [
    {
      data: metrics.map((m) => ({
        primary: m.name,
        secondary: m.sum,
      })),
    },
  ];

  const primaryAxis = {
    getValue: (d) => d.primary,
    scaleType: 'band',
    padding: 0.2,
    position: 'bottom',
  };


  const secondaryAxes = [
    {
      getValue: (d) => d.secondary,
      scaleType: 'linear',
      min: 0,
      max: 100,
      padding: {
        top: 20,
        bottom: 40,
      },
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container" >
        <h2>Total is spist denne sommeren (2025) </h2>
        <div style={{ flex: 1 }}>
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes, 
              type: 'bar',
              defaultColors: ['#ca335dff'],
              tooltip: {
                show: false,
              },
            }}
          />
        </div>
      </div>
      <Form />
    </div>
  );
};

export default Dashboard;