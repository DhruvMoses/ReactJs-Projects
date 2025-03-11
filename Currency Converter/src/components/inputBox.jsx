import React from "react";
import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "USD",
  amountdisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      {/* FROM/TO Label & Input Field */}
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountdisable}
          value={amount}
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : ""; 
            onAmountChange?.(value);
          }}
        />
      </div>

      {/* Currency Dropdown */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;





// import React from 'react'
// import { useId } from "react"; 



// function InputBox({
//     //Declaring variables

//     label,  //"from" which currency "to" which currency
//     amount,  //the amount that user inputs
//     onAmountChange, //the amount entered by user that will get changed
//     onCurrencyChange, //the filter by which we can ask "which currency you want"
//     currencyOptions =[],  //we will loop through all the currency filters using an "array"
//     selectCurrency = "usd", //by default "from" currency's value
//     amountdisable = false,  //
//     currencyDisable = false,
//     className = "",

// }) {

//     const amountInputId = useId();

//     return (
//         <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>

//             {/* here we have the FROM,TO & input amt field part */}
//             <div className="w-1/2">
//                 <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
//                     {label}
//                 </label>
//                 <input
//                     id={amountInputId}
//                     className="outline-none w-full bg-transparent py-1.5"
//                     type="number"
//                     placeholder="Amount"
//                     disabled = {amountdisable}
//                     value= {amount}  //amt that the user will input
//                     onChange={(e)=>{onAmountChange && onAmountChange(Number(e.target.value))}} //like $100,$1
//                 />
//             </div>

//             {/* Here we have currency tpe dorp down box part*/}
//             <div className="w-1/2 flex flex-wrap justify-end text-right">
//                 <p className="text-black/40 mb-2 w-full">Currency Type</p>
//                 <select
//                 className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"   
//                 value={selectCurrency}
//                 onChange={(e)=>{onCurrencyChange && onCurrencyChange(e.target.value)}} //like convertto INR,YEN etc
//                 disabled = {currencyDisable}
//                 >
//                     {currencyOptions.map((currency) => (  //we will loop all the currencies
//                         <option key={currency} value={currency}>
//                         {currency} 
//                         </option>
//                     ))};

//                 </select>
//             </div>

//         </div>
//     );
// }

// export default InputBox;
