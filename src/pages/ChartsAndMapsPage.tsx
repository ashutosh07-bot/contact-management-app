import React from 'react';
import { Line } from 'react-chartjs-2';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';
import 'leaflet/dist/leaflet.css'; 
import 'chart.js/auto';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import logo from './logo.png';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartsAndMapsPage: React.FC = () => {

  // Custom icon for map markers
  const customIcon = L.icon({
    iconUrl: logo, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [0, -41] 
  });

  // Fetch COVID-19 global data
  const { isLoading: isGlobalDataLoading } = useQuery('globalData', () =>
    fetch('https://disease.sh/v3/covid-19/all').then(res => res.json())
  );

  // Fetch COVID-19 countries data
  const { data: countriesData, isLoading: isCountriesDataLoading } = useQuery('countriesData', () =>
    fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json())
  );

  // Fetch historical COVID-19 data
  const { data: historicalData, isLoading: isHistoricalDataLoading } = useQuery('historicalData', () =>
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res => res.json())
  );

  // Show loading message while fetching data
  if (isGlobalDataLoading || isCountriesDataLoading || isHistoricalDataLoading) {
    return <div>Loading...</div>;
  }

  // Chart data for cases over time
  const chartData = {
    labels: Object.keys(historicalData?.cases || {}),
    datasets: [
      {
        label: 'Cases Over Time',
        data: Object.values(historicalData?.cases || {}),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };
  
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Cases Over Time</h2>
        <div className="bg-white p-4 rounded shadow">
          <Line data={chartData} />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-center text-xl font-semibold mb-4">COVID-19 Map</h2>
        <div className="bg-white p-4 rounded shadow">
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {countriesData.map((country: any) => (
              <Marker
                key={country.countryInfo._id}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{country.country}</strong><br />
                  Active Cases: {country.active}<br />
                  Recovered Cases: {country.recovered}<br />
                  Deaths: {country.deaths}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsAndMapsPage;
