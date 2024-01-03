import React from "react";

const Total_Read = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "stock_total",
      { cache: "no-store" }
    );
    const totalData = await response.json();
    console.log(totalData);
    return totalData;
  } catch {
    return null;
  }
};

export default Total_Read;
