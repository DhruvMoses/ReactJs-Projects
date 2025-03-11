import { useEffect, useState } from "react";

function useCurrencyInfo(from, to) {
    const [exchangeRate, setExchangeRate] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    const apiKey = "2bf8072a52b87e133a353ac8";

    // Fetch all available currencies
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
                const data = await response.json();
                
                if (data && data.supported_codes) {
                    setCurrencies(data.supported_codes.map(code => code[0])); // Extract currency codes
                }
            } catch (error) {
                console.error("Error fetching currencies:", error);
                setCurrencies([]);
            }
        };

        fetchCurrencies();
    }, []);

    // Fetch exchange rate between selected currencies
    useEffect(() => {
        if (!from || !to) return;

        const fetchExchangeRate = async () => {
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
                const result = await response.json();

                if (result && result.conversion_rate) {
                    setExchangeRate(result.conversion_rate);
                } else {
                    setExchangeRate(null);
                }
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
                setExchangeRate(null);
            }
        };

        fetchExchangeRate();
    }, [from, to]);

    return { exchangeRate, currencies };
}

export default useCurrencyInfo;




// import { useEffect, useState, useId } from "react";
// import App from "../App";

// function useCurrenyInfo(currency){

//     const [data,setData] = useState({})
//     const api_Key = "2bf8072a52b87e133a353ac8"
//     useEffect(()=>{
//         fetch(`https://v6.exchangerate-api.com/v6/${api_Key}/pair/${from}/${to}`)
//         .then((res)=> res.json()) //to convert the api string data to json
//         .then((res)=> setData(res[currency])) 
//         console.log(data)
//     },[currency])

//     console.log(data);
//     return data

// }

// export default useCurrenyInfo;