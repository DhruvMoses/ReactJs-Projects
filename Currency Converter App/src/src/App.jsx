// /*What we will learn in this:-
//   1. Creating custom hooks
//   2. Craeting a component
//   3. Learning "Remarkable Component Reusabilty"
//   4. Calling an API nad fetching data from it 
// */

import { useState, useEffect } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./customHook/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { exchangeRate, currencies } = useCurrencyInfo(from, to);

  // Automatically update converted amount when exchangeRate is available
  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [exchangeRate, amount]); // Runs when exchangeRate OR amount changes

  // Swap function: Switch 'from' and 'to' currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // Convert function: Multiplies input amount with exchange rate
  const convert = () => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/10653886/pexels-photo-10653886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 
            rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={currencies}  
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(value) => setAmount(value)}
                selectCurrency={from}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={currencies}  
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountdisable
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;



// import { useState } from 'react'
// import { InputBox } from './components'
// import useCurrencyInfo from './customHook/useCurrencyInfo'


// function App() {

// const [amount,setAmount] = useState(0)
// const [from, setFrom] = useState("inr")
// const [to, setTo] = useState("usd")
// const [convertedAmount, setConvertedAmount] = useState(0)

// //jo humne custom hook/function banaya h usme "currency" as parameter pass hori hai toh wo user hi batayega 
// // "from" wale input mai konsi "currency se" konsi "currency mai" convert krna chahta hai Eg:- INR -> USD
// const currencyInfo = useCurrencyInfo(from)

// //ye jo bhi api m itni sari key:value pairs honge unke sirf keys ko extract krke hold krega array m
// //[NOTE:- aur humne custom hook/function mai jo "data" return karwaya h usme hi saari "key:value" pairs hongi]
// const options = Object.keys(currencyInfo)

// //ye hai wo "SWAP" button ke liye jo uppr "from" tha sab "to" mai aajayega and vice-versa
// const swap = () => {
//   setFrom(to)
//   setTo(from)
//   setConvertedAmount(amount)
//   setAmount(convertedAmount)
// }

// //ye function tab kaam krega jab user "convert" pe click krega
// // jo bhi user "amount" dega wo multiply hojaega un sab "keys" se aur uss currency se 
// // jisme convert krna hai
// const convert = () =>{
//   setConvertedAmount(amount * currencyInfo[to])
// } 

// return (
//   <div
//     className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
//     style={{backgroundImage: `url('https://images.pexels.com/photos/10653886/pexels-photo-10653886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,}}
//   >
//       <div className="w-full">
//           <div className="w-full max-w-md mx-auto border border-gray-60 
//               rounded-lg p-5 backdrop-blur-sm bg-white/30">
//               <form
//                   onSubmit={(e) => {
//                   e.preventDefault();
//                   convert();  
//                   }}>
//                   <div className="w-full mb-1">
//                       <InputBox
//                         label="From"  
//                         amount={amount} //the amt users puts
//                         currencyOptions={options}  //the options of currencies
//                         onCurrencyChange={(currency)=> setAmount(amount)} //
//                         onAmountChange={(amount)=> setAmount(amount)}
//                         selectCurrency={from}  //the currency user chooses from the options
//                       />
//                   </div>

//                   <div className="relative w-full h-0.5">
//                       <button
//                         type="button"
//                         className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
//                         border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
//                         onClick={swap}>
//                         swap
//                       </button>
//                   </div>

//                   <div className="w-full mt-1 mb-4">
//                       <InputBox
//                         label="To"  
//                         amount={convertedAmount} //the converted amt that will be shown
//                         currencyOptions={options}  //to which currency should it convert to
//                         onCurrencyChange={(currency)=>setTo(currency)} 
//                         selectCurrency={to} 
//                         amountdisable  //so that user cannot change the converted amt 
//                       />
//                   </div>

//                   <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
//                     Convert {from.toUpperCase()} to {to.toUpperCase()}
//                   </button>
//               </form>
//           </div>
//       </div>
//   </div>
// );

// }

// export default App
