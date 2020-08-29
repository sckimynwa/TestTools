import React, { useState } from "react";
import styled from "styled-components";

// styles
const CounterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 30px;
`;

const CounterButton = styled.button`
  display: flex;
  width: 200px;
  height: 50px;
  margin: auto;
  font-size: 15px;
  background: white;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CounterTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const CounterWrapperDiv = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid black;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [countByOne, setCountByOne] = useState(0);
  const [countByTwo, setCountByTwo] = useState(0);
  // workers
  const countByOneWorker = new Worker("./workers/countByOneWorker.js");
  const countByTwoWorker = new Worker("./workers/countByTwoWorker.js");

  console.log(countByOneWorker);

  // handle workers
  const handleCountByOne = () => {
    console.log("handlecountbyone");
    countByOneWorker.postMessage(countByOne);
  };
  const handleCountByTwo = () => {
    console.log("handlecountbytwo");
    countByTwoWorker.postMessage(countByTwo);
  };

  // console state update
  console.log("App Rendered");

  // listen worker message
  countByOneWorker.onmessage = function(msg) {
    console.log("Main Thread Count By One Worker");
    setCountByOne(msg.data);
  };
  countByTwoWorker.onmessage = function(msg) {
    console.log("Main Thread Count By Two Worker");
    setCountByTwo(msg.data);
  };

  return (
    <>
      <CounterTitleDiv>Counter</CounterTitleDiv>
      {/* Counter */}
      <CounterWrapperDiv>
        <CounterDiv>{countByOne}</CounterDiv>
        <CounterDiv>{countByTwo}</CounterDiv>
      </CounterWrapperDiv>
      {/* Counter Enable Button */}
      <CounterWrapperDiv>
        <CounterButton onClick={handleCountByOne}>count by one</CounterButton>
        <CounterButton onClick={handleCountByTwo}>count by two</CounterButton>
      </CounterWrapperDiv>
    </>
  );
};

export default App;
