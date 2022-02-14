import { useState, useEffect } from "react";
import "./styles.css";

enum enumType {
  PRIME = "prime",
  FIBONACCI = "fibonnacci"
}

// copy/paste
const isPrime = (number: number) => {
  for (let i = 2, s = Math.sqrt(number); i <= s; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return number > 1;
};

// copy/paste
const isPerfectSquare = (x: number) => {
  const s = Math.floor(Math.sqrt(x));
  return s * s === x;
};

// copy/paste
const isFibonacci = (n: number) => {
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
};

export default function App() {
  const [number, setNumber] = useState<number | string>("");
  const [type, setType] = useState<enumType>(enumType.PRIME);
  const [result, setResult] = useState(false);

  const typeOptions = [
    {
      value: enumType.PRIME,
      label: "isPrime"
    },
    {
      value: enumType.FIBONACCI,
      label: "isFibonacci"
    }
  ];

  const listItems = typeOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const handleChangeNumber = (event: any) => setNumber(event.target.value);

  const handleBlurNumber = (event: any) => {
    let value = event.target.value;
    if (isNaN(value) || value === "") {
      return setNumber("");
    }

    value = Math.round(value);
    if (value < 0) {
      value = 1;
    }

    setNumber(value);
  };

  const handleChangeType = (event: any) => setType(event.target.value);

  useEffect(() => {
    let calcResult = false;

    if (number && number > 0) {
      switch (true) {
        case type === enumType.PRIME:
          console.log("PRIME");
          calcResult = isPrime(Number(number));
          break;
        case type === enumType.FIBONACCI:
          calcResult = isFibonacci(Number(number));
          break;
      }
    }

    setResult(calcResult);
  }, [number, type]);

  return (
    <div className="app">
      <div className="number-col">
        <input
          type="text"
          value={number}
          onChange={handleChangeNumber}
          onBlur={handleBlurNumber}
        />
      </div>
      <div className="type-col">
        <select value={type} onChange={handleChangeType}>
          {listItems}
        </select>
      </div>
      <div className="result-col">
        <span>{result ? "true" : "false"}</span>
      </div>
    </div>
  );
}
