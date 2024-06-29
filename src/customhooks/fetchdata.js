import { useState, useEffect } from 'react';

const useFetchdata = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const dataArray = Object.values(jsonData).map(item => ({
          Country: item.Country,
          Year: item.Year,
          CropName: item['Crop Name'],
          CropProduction: item['Crop Production (UOM:t(Tonnes))'],
          YieldOfCrops: item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'],
          AreaUnderCultivation: item['Area Under Cultivation (UOM:Ha(Hectares))'],
        }));
        setData(dataArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchdata;
