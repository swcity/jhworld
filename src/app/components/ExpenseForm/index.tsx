import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";

type ExpenseFormState = {
  type: "income" | "expense";
  date: string;
  price: number | string;
  quantity: number | string;
  total: number | string;
  source: string;
  product: string;
  category: string;
  paymentMethod: string;
};

const ExpenseForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<ExpenseFormState>({
    type: "expense",
    date: "",
    price: "",
    quantity: "",
    total: "",
    source: "",
    product: "",
    category: "",
    paymentMethod: "",
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      type: (event.target as HTMLInputElement).value as "income" | "expense",
    });
  };

  const handleInputChange =
    (key: keyof ExpenseFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormState({
        ...formState,
        [key]: event.target.value,
      });
    };

  const handleSelectChange =
    (key: keyof ExpenseFormState) => (event: SelectChangeEvent<string>) => {
      setFormState({
        ...formState,
        [key]: event.target.value as string,
      });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 여기서 데이터를 저장하거나 전송하는 로직 추가
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    };
    fetch(process.env.NEXT_PUBLIC_API_URL + "expenses_data", options)
      .then((res) => res.json())
      .then((result) => {
        router.refresh();
      });
    console.log("Form submitted:", formState);
  };

  const paymentMethods = [
    "카드(현대)",
    "카드(국민)",
    "카드(롯데)",
    "현금",
    "카드(하머니)",
    "현금(쿠페이)",
    "현금(네이버페이)",
    "기타",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Expense Type</FormLabel>
        <RadioGroup
          row
          aria-label="expense-type"
          name="expense-type"
          value={formState.type}
          onChange={handleTypeChange}
        >
          <FormControlLabel value="income" control={<Radio />} label="수입" />
          <FormControlLabel value="expense" control={<Radio />} label="지출" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="날짜"
        type="date"
        value={formState.date}
        onChange={handleInputChange("date")}
        margin="normal"
        fullWidth
      />
      <TextField
        label="금액"
        type="number"
        value={formState.price}
        onChange={handleInputChange("price")}
        margin="normal"
        fullWidth
      />
      {formState.type === "expense" && (
        <>
          <TextField
            label="수량"
            type="number"
            value={formState.quantity}
            onChange={handleInputChange("quantity")}
            margin="normal"
            fullWidth
          />
          <TextField
            label="합계"
            type="number"
            value={formState.total}
            onChange={handleInputChange("total")}
            margin="normal"
            fullWidth
          />
          <TextField
            label="상품명"
            value={formState.product}
            onChange={handleInputChange("product")}
            margin="normal"
            fullWidth
          />
        </>
      )}
      {formState.type === "income" && (
        <TextField
          label="출처"
          value={formState.source}
          onChange={handleInputChange("source")}
          margin="normal"
          fullWidth
        />
      )}

      <TextField
        label="카테고리"
        value={formState.category}
        onChange={handleInputChange("category")}
        margin="normal"
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>결제수단</InputLabel>
        <Select
          value={formState.paymentMethod}
          onChange={handleSelectChange("paymentMethod")}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default ExpenseForm;
