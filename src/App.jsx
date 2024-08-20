import React, { useState } from 'react';
import Navbar from '../src/Navbar';
import Table from './Table';

const App = () => {
  const [allSource, setAllSource] = useState(["Rupay", "Master"]);

  return (
    <>
      <div className="container-fluid bg-light-blue vh-100 pt-2">
        <Navbar />
        {allSource.map(source => (
          <Table source={source} key={source} />
        ))}
      </div>
    </>
  );
}

export default App;
