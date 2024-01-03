"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Total_Read from "../../components/stock/total/read";
import Total_create from "./Total_create";

type stock_company_input = {
  id: number;
  companyName: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
};

type stock_company_cal = stock_company_input & {
  buyValue: number;
  currentValue: number;
  profitPercentage: String;
  profitValue: number;
};

const Total = () => {
  const [inputs, setInputs] = useState<Array<stock_company_input> | any>();
  const [value, setValue] = useState("create");
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "stock_total", {
      cache: "no-store",
    })
      .then((resp) => resp.json())
      .then((result) => setInputs(result));
  }, []);

  function calculateValues(
    inputs: Array<stock_company_input>
  ): Array<stock_company_cal> {
    return inputs.map((input: stock_company_input) => {
      // 각 요소에 key a, b, c를 추가하고 해당 값을 계산
      const buyValue = input.amount * input.buyPrice;
      const currentValue = input.amount * input.currentPrice;
      const result: stock_company_cal = {
        ...input,
        buyValue: buyValue,
        currentValue: currentValue,
        profitPercentage:
          ((currentValue / buyValue - 1) * 100).toFixed(2) + "%",
        profitValue: currentValue - buyValue,
      };

      return result;
    });
  }

  const rows: Array<stock_company_cal> = inputs && calculateValues(inputs);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    console.log(value);
  };
  return (
    <div>
      Total
      <div className="flex-col flex">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={value}
            value={value}
            name="radio-buttons-group"
            onChange={handleChange}
            row
          >
            <FormControlLabel value="create" control={<Radio />} label="추가" />
            <FormControlLabel value="edit" control={<Radio />} label="수정" />
            <FormControlLabel value="delete" control={<Radio />} label="삭제" />
          </RadioGroup>
        </FormControl>
        <Total_create />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>CompanyName</TableCell>
                <TableCell align="right">수량</TableCell>
                <TableCell align="right">평단가</TableCell>
                <TableCell align="right">현재가</TableCell>
                <TableCell align="right">구매금액</TableCell>
                <TableCell align="right">현재금액</TableCell>
                <TableCell align="right">수익률</TableCell>
                <TableCell align="right">평가이익</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.companyName}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.buyPrice}</TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                    <TableCell align="right">{row.buyValue}</TableCell>
                    <TableCell align="right">{row.currentValue}</TableCell>
                    <TableCell align="right">{row.profitPercentage}</TableCell>
                    <TableCell align="right">{row.profitValue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Total;
