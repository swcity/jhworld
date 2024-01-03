"use client";

import React from "react";
import ExpenseForm from "../components/ExpenseForm";

const ExpensesPage: React.FC = () => {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm />
    </div>
  );
};

export default ExpensesPage;
