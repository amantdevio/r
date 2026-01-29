import { useState } from 'react'
import InputBox from './components/InputBox';
import userCurrencyInfo from './hooks/customHook';
// import './App.css'

function App() {
    let [amount,setAmount]=useState();
    if(amount===0){
        amount="Amount";
    }
  const [to,setTo]=useState("inr");
  const [from, setFrom]=useState("usd");
  const [convertedAmount, setConvertedAmount]=useState();

  const currencyInfo=userCurrencyInfo(from);
  const option = Object.keys(currencyInfo);

  const swap=()=>{
    setTo(from),
    setFrom(to),
    setAmount(convertedAmount),
    setConvertedAmount(amount)
  }

  const convert=()=>{
    setConvertedAmount(amount*currencyInfo[to])
  }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://openexchangerates.org/assets/img/showcase/ddw-currency-converter.png')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
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
                                currencyOption={option}
                                selectCurrency={from}
                                onCurrencyChange={(currency)=>setFrom(currency)}
                                onAmountChange={(amount)=>setAmount(amount)}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                                
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                amount={convertedAmount}
                                label="To"
                                currencyOption={option}
                                selectCurrency={to}
                                onCurrencyChange={(currency)=>setTo(currency)}
                                amountDisable
                                
                            />
                        </div>
                        <button type="submit" onClick={convert} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from} to {to}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
  }

export default App;
