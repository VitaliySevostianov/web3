import React, {useEffect, useState} from 'react';
import './App.css';

const ethereum = window.ethereum

function App() {
  
  const [ , setUserAccount] = useState(ethereum.selectedAddress)
  const [currentBalance, setCurrentBalance] = useState(0)

  useEffect(() => {
    ethereum.on('accountsChanged', async () => {
      if(typeof ethereum.selectedAddress !== 'string') return
      const balance = await ethereum.request({ method: 'eth_getBalance', params: [ethereum.selectedAddress, 'latest'], });
      setCurrentBalance(parseInt(balance,16) * Math.pow(10,(-18)))
    });
    
    return ethereum.removeListener('accountsChanged', () => {});
  }, [])

  useEffect(() => {
    if(typeof ethereum.selectedAddress !== 'string') return
      (async () => {
        const balance = await ethereum.request({ method: 'eth_getBalance', params: [ethereum.selectedAddress, 'latest'], });
        setCurrentBalance(parseInt(balance,16) * Math.pow(10,(-18)))
      })()
  }, [ethereum.selectedAddress])

  const ethRequest = async () => {
    if (typeof ethereum !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(accounts)
    }
  }
  return (
    <div className="App">
      <button onClick={ethRequest} style={{width: "100px", height: "50px"}}>Connect Account</button>
      <h2>Account Address: <span>{ethereum.selectedAddress}</span></h2>
      <h2>Balance: <span>{currentBalance}</span></h2>
    </div>
  );
}

export default App;
