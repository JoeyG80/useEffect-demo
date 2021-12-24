import React, { useEffect, useState } from 'react';
import './App.css';

function App(): JSX.Element {
  const [data, setData] = useState<string>('standby');
  const [otherData, setOtherData] = useState<string>('standby');
  const [changingValue, setChangingValue] = useState<boolean>(false);

  const updateStatus = (isComponentMounted: any): void => {
    setTimeout(() => {
      if (isComponentMounted.flag) {
        if (Math.random() > .5) {
          setData('sucess');
        } else {
          setData('fail');
        }
      }
    }, 0);
  };

  // Empty second argument means this will only be executed twice. (on mount and on unmount)
  // Can prevent memory leaks by useing a boolean flag. (If using a function, a normal boolean won't work)
  useEffect(() => {
    let isComponentMounted = {flag: true};
    console.log('executed');
    updateStatus(isComponentMounted);
    const updateInterval = setInterval(updateStatus, 5000);
    return function cleanup() {
      isComponentMounted.flag = false;
      clearInterval(updateInterval);
    };
  }, []);

  // Because we specify otherData as a dependency, useEffect will continue to execute every rerender.
  // We want to do this alongside a guard statement in order to ensure execution of our code 
  // until a certain value is met.
  useEffect(() => {
    let isComponentMounted = true;
  
    if (otherData !== 'sucess') {
      setTimeout(() => {
        if (isComponentMounted) {
          if (Math.random() > .5) {
            setOtherData('sucess');
          } else {
            setOtherData('fail');
          }
        }
      }, 5000);
    }
    return () => {
      isComponentMounted = false;
    }; 
  }, [otherData]);

  return (
    <>
      <div className={`App ${data}`} aria-label='data'>{data} {otherData}</div>
      <button onClick={() => setChangingValue(!changingValue)}>Click me to cause a rerender: {`${changingValue}`}</button>
    </>
  );
}

export default App;
