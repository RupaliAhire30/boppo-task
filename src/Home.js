import React, { useState } from 'react';
import './Home.css';
import myapi from './Api';

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterClick = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter(item => item !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  const handleCancelFilter = (filterName) => {
    setSelectedFilters(selectedFilters.filter(item => item !== filterName));
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredJobs = myapi.filter(job =>
    selectedFilters.every(filter =>
      job.category.some(category => category.filterName === filter)
    )
  );

  return (
    <div className='main'>
      <div className='container'>
        <div className='search'>
          <div className="inputContainer">
            <div className="selectedFiltersContainer">
              {selectedFilters.map((filter, index) => (
                <button
                  key={index}
                  className='cancelFilterBtn'
                  onClick={() => handleCancelFilter(filter)}
                >
                  {filter} x
                </button>
              ))}
            </div>
            
          </div>
          <button className='clear' onClick={handleClearFilters}>clear</button>
        </div>

        <div className='jobLists'>
          {filteredJobs.map((job, index) => (
            <div className='jobList' key={index}>
              <div className='jobName'>
                <div className='jobImage'>

                    <img className='jobImages' src={job.image} />
                </div>
                <div className='job'>
                    <div className='j'>
                  <div className='jobTitle'><h5>{job.companyName}</h5></div>
                  <div className='jobDesc'><h5>{job.description}</h5></div>
                  </div>
                </div>
              </div>
              <div className='jobFilter'>
                <div className='jobFilterbtn'>
                  {job.category.map((category, idx) => (
                    <div key={idx} className={`filter ${selectedFilters.includes(category.filterName) ? 'active' : ''}`} onClick={() => handleFilterClick(category.filterName)}>
                      <h5>{category.filterName}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
