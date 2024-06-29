import React, { useEffect, useState } from 'react';
import useFetchData from '../customhooks/fetchdata'; 
import styles from '../styles/Agridataset.module.css'; 
import Loading from '../components/loader';
import Error from "../components/error";

const YearlyProductionTable = () => {
  const [yearlyData, setYearlyData] = useState([]);

  const { data,loading,error } = useFetchData();

  // Function to process data and find max/min production crops by year
  const processYearlyData = (data) => {
    const processedData = [];

    // Group data by year
    const groupedByYear = data.reduce((acc, item) => {
      if (!acc[item.Year]) acc[item.Year] = [];
      acc[item.Year].push(item);
      return acc;
    }, {});

    // Iterate over grouped data to find max/min production crops for each year
    for (const year in groupedByYear) {
      const yearData = groupedByYear[year].filter(item => item['CropProduction'] !== "");

      if (yearData.length > 0) {
        const maxProductionCrop = yearData.reduce((prev, curr) =>
          parseFloat(prev['CropProduction']) > parseFloat(curr['CropProduction']) ? prev : curr
        );
        const minProductionCrop = yearData.reduce((prev, curr) =>
          parseFloat(prev['CropProduction']) < parseFloat(curr['CropProduction']) ? prev : curr
        );

        processedData.push({ year, maxProductionCrop: maxProductionCrop['CropName'], minProductionCrop: minProductionCrop['CropName'] });
      } else {
        processedData.push({ year, maxProductionCrop: 'N/A', minProductionCrop: 'N/A' });
      }
    }

    setYearlyData(processedData);
  };

  useEffect(() => {
    if (data.length > 0) {
      processYearlyData(data);
    }
  }, [data]);


  if (loading) {
    return (
     <Loading/>
    );
  }

  if (error) {
    return (
      <Error error={error}/>
    )
  }

  return (
    <div>
      <h2 align="center">Yearly Production Data</h2>
      <table
        align='center'
        className={styles.table}
      >
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum
              Production in that Year</th>
            <th>Crop with Minimum
              Production in that Year</th>
          </tr>
        </thead>
        <tbody>
          {yearlyData.map((item, index) => (
            <tr key={index}>
              <td>{item.year.split(',')[1]}</td>
              <td>{item.maxProductionCrop}</td>
              <td>{item.minProductionCrop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearlyProductionTable;
