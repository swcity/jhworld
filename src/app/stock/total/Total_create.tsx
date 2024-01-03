import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type CreateProps = {
  companyName: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
};

const Total_create = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyName = (e.target as HTMLFormElement).companyName.value;
    const amount = (e.target as HTMLFormElement).amount.value;
    const buyPrice = (e.target as HTMLFormElement).buyPrice.value;
    const currentPrice = (e.target as HTMLFormElement).currentPrice.value;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName, amount, buyPrice, currentPrice }),
    };
    fetch(process.env.NEXT_PUBLIC_API_URL + "stock_total", options)
      .then((res) => res.json())
      .then((result) => {
        router.refresh();
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="companyName" placeholder="companyName" />
        <input type="text" name="amount" placeholder="amount" />
        <input type="text" name="buyPrice" placeholder="buyPrice" />
        <input type="text" name="currentPrice" placeholder="currentPrice" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Total_create;
