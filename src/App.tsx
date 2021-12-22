import React, { useEffect, useState } from 'react';
import './App.css';

function App(): JSX.Element {
  const [data, setData] = useState<string>('standby');
  const [otherData, setOtherData] = useState<string>('standby');
  const [changingValue, setChangingValue] = useState<boolean>(false);

  const updateStatus = (): void => {
    setTimeout(() => {
        if (Math.random() > .5) {
          setData('sucess');
        } else {
          setData('fail');
        }
    }, 0);
  };

  // Empty second argument means this will only be executed twice. (on mount and on unmount)
  useEffect(() => {
    console.log('executed');
    updateStatus();
    const updateInterval = setInterval(updateStatus, 5000);
    return function cleanup() {
      clearInterval(updateInterval);
    };
  }, []);

  // Because we specify otherData as a dependency, useEffect will continue to execute every rerender.
  // We want to do this alongside a guard statement in order to ensure execution of our code 
  // until a certain value is met.
  useEffect(() => {
    if (otherData !== 'sucess') {
      setTimeout(() => {
        if (Math.random() > .5) {
          setOtherData('sucess');
        } else {
          setOtherData('fail');
        }
      }, 5000);
    }
  }, [otherData]);

  return (
    <>
      <div className={`App ${data}`} aria-label='data'>{data} {otherData}</div>
      <button onClick={() => setChangingValue(!changingValue)}>Click me to cause a rerender: {`${changingValue}`}</button>
    </>
  );
}

export default App;
