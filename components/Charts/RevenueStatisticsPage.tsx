import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface TourRevenueDTO {
  id: number;
  name: string;
  revenue: number;
  bookingcount: number;
}

interface CarRevenueDTO {
  rentalId: number;
  carName: string;
  totalRentals: number;
  totalRevenue: number;
}

const RevenueStatisticsPage: React.FC = () => {
  const [tours, setTours] = useState<TourRevenueDTO[]>([]);
  const [cars, setCars] = useState<CarRevenueDTO[]>([]);
  const [tourYear, setTourYear] = useState<number>(new Date().getFullYear());
  const [carYear, setCarYear] = useState<number>(new Date().getFullYear());
  const [tourMonth, setTourMonth] = useState<number>(new Date().getMonth() + 1);
  const [carMonth, setCarMonth] = useState<number>(new Date().getMonth() + 1);
  const [isTourMonthly, setIsTourMonthly] = useState<boolean>(true);
  const [isCarMonthly, setIsCarMonthly] = useState<boolean>(true);

  const fetchTourData = async () => {
    const url = isTourMonthly
      ? `http://localhost:8080/api/revenuestatistics/toptours/month?year=${tourYear}&month=${tourMonth}`
      : `http://localhost:8080/api/revenuestatistics/toptours/year?year=${tourYear}`;
    const response = await fetch(url);
    const data: TourRevenueDTO[] = await response.json();
    setTours(data);
  };

  const fetchCarData = async () => {
    const url = isCarMonthly
      ? `http://localhost:8080/api/revenuestatistics/topcars/month?year=${carYear}&month=${carMonth}`
      : `http://localhost:8080/api/revenuestatistics/topcars/year?year=${carYear}`;
    const response = await fetch(url);
    const data: CarRevenueDTO[] = await response.json();
    setCars(data);
  };

  useEffect(() => {
    fetchTourData();
  }, [tourYear, tourMonth, isTourMonthly]);

  useEffect(() => {
    fetchCarData();
  }, [carYear, carMonth, isCarMonthly]);

  const tourChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: tours.map(tour => tour.name),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
    },
  };

  const tourChartSeries = [
    {
      name: 'Total Bookings',
      data: tours.map(tour => tour.bookingcount),
    },
    {
      name: 'Total Revenue',
      data: tours.map(tour => tour.revenue),
    },
  ];

  const carChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: cars.length > 0 ? cars.map(car => car.carName) : ['No Data'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
    },
  };

  const carChartSeries = [
    {
      name: 'Total Rentals',
      data: cars.length > 0 ? cars.map(car => car.totalRentals) : [0],
    },
    {
      name: 'Total Revenue',
      data: cars.length > 0 ? cars.map(car => car.totalRevenue) : [0],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thống kê doanh thu theo tour</h2>
      <select onChange={(e) => setTourYear(Number(e.target.value))} value={tourYear}>
        {[2019, 2020, 2021, 2022, 2023, 2024].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={isTourMonthly}
          onChange={(e) => setIsTourMonthly(e.target.checked)}
        />
        Thống kê theo tháng
      </label>

      {isTourMonthly && (
        <select onChange={(e) => setTourMonth(Number(e.target.value))} value={tourMonth}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      )}

      <Chart options={tourChartOptions} series={tourChartSeries} type="bar" height={350} />

      <h2>Thống kê doanh thu theo xe</h2>
      <select onChange={(e) => setCarYear(Number(e.target.value))} value={carYear}>
        {[2019, 2020, 2021, 2022, 2023, 2024].map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={isCarMonthly}
          onChange={(e) => setIsCarMonthly(e.target.checked)}
        />
        Thống kê theo tháng
      </label>

      {isCarMonthly && (
        <select onChange={(e) => setCarMonth(Number(e.target.value))} value={carMonth}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      )}
      <Chart options={carChartOptions} series={carChartSeries} type="bar" height={350} />
    </div>
  );
};

export default RevenueStatisticsPage;