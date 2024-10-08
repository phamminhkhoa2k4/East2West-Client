"use client";
import RevenueStatisticsPage from "@/components/Charts/RevenueStatisticsPage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

const BasicChartPage: React.FC = () => {
  return (
    <>
    <DefaultLayout>
      {/* <Breadcrumb pageName="Basic Chart" /> */}

      < RevenueStatisticsPage/>
      <div></div>
   
    </DefaultLayout>
    </>
    
  );
};

export default BasicChartPage;
