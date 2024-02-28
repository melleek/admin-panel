import React, { useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { LineChart } from '@mui/x-charts/LineChart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Tableau10 = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

const chartsParams = {
  margin: { bottom: 20, left: 25, right: 5 },
  height: 300,
};


const Home = () => {

  const [color, setColor] = useState('#4e79a7');

  const handleChange = (event, nextColor) => {
    setColor(nextColor);
  };

  return (
    <section className='flex flex-col items-start gap-[10px]'>

      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <main className='flex items-center justify-between gap-[50px]'>

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'User A' },
                { id: 1, value: 15, label: 'User B' },
                { id: 2, value: 20, label: 'User C' },
              ],
            },
          ]}
          width={400}
          height={200}
        />

        <Stack direction="column" spacing={1} alignItems="center" sx={{ width: '100%' }}>
          <LineChart
            {...chartsParams}
            series={[
              {
                data: [15, 23, 18, 19, 13],
                label: 'Color',
                color,
              },
            ]}
          />
          <ToggleButtonGroup
            // orientation="vertical"
            value={color}
            exclusive
            onChange={handleChange}
          >
            {Tableau10.map((value) => (
              <ToggleButton key={value} value={value} sx={{ p: 1 }}>
                <div
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: value,
                    display: 'inline-block',
                  }}
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

      </main>

      <Stack direction="row" sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart data={[3, -10, -2, 5, 7, -2, 4, 6]} height={100} area />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart
            data={[3, -10, -2, 5, 7, -2, 4, 6]}
            height={100}
            curve="natural"
            area
          />
        </Box>
      </Stack>

    </section>
  )
}

export default Home 