import React, { useEffect, useState } from 'react';
import { Table, Title, Container, MantineProvider } from '@mantine/core';
import useFetchData from '../customhooks/fetchdata';
import styles from '../styles/Agridataset.module.css';
import Error from '../components/error';
import Loading from '../components/loader';

const AggregatedCropDataTable = () => {
  
  const { data, loading, error } = useFetchData();
  const [aggregatedData, setAggregatedData] = useState([]);

  
  useEffect(() => {
    if (data.length > 0) {
      processAggregatedData(data);
    }
  }, [data]);

  
  const processAggregatedData = (data) => {
    const cropData = {};

    data.forEach(item => {
      const { CropName, AreaUnderCultivation, YieldOfCrops } = item;

      // Initialize crop data if it doesn't exist
      if (!cropData[CropName]) {
        cropData[CropName] = {
          totalYield: 0,
          totalArea: 0,
          count: 0,
        };
      }

      // Aggregate data for each crop
      const crop = cropData[CropName];
      crop.totalYield += parseFloat(YieldOfCrops) || 0;
      crop.totalArea += parseFloat(AreaUnderCultivation) || 0;
      crop.count += 1;
    });

    // Prepare processed data for rendering
    const processedData = Object.keys(cropData).map(cropName => {
      const crop = cropData[cropName];
      return {
        cropName,
        avgYield: crop.totalYield / crop.count,
        avgArea: crop.totalArea / crop.count,
      };
    });

    setAggregatedData(processedData);
  };

  
  if (loading) {
    return <Loading />;
  }

  
  if (error) {
    return <Error error={error} />;
  }

  return (
    <MantineProvider>
      <Container align="center">
        <Title order={2} my="md">
          Aggregated Crop Data Table (1950-2020)
        </Title>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>Crop</th>
              <th>
                Average Yield of the Crop between 1950-2020
              </th>
              <th>
                Average Cultivation Area of the Crop between 1950-2020
              </th>
            </tr>
          </thead>
          <tbody>
            {aggregatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.cropName}</td>
                <td>{item.avgYield.toFixed(2)}</td>
                <td>{item.avgArea.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </MantineProvider>
  );
};

export default AggregatedCropDataTable;
