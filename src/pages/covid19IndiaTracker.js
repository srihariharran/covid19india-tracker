import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

// Covid 19 India Tracker Function

function Covid19IndiaTracker()
{
    // State variable to maintain original json data from source
    const [originalData,setOriginalData] = useState({});

    // State variable to store overall data
    const [overallData,setOverallData] = useState({});
    useEffect(()=>{
        axios.get('https://data.covid19india.org/v4/min/data.min.json')
        .then(function (response) {
            var responseData = response.data;
            setOriginalData(responseData)
            
            // Initialising Variable to store overall Data
            var overallConfirmed = 0;
            var overallDeceased = 0;
            var overallRecovered = 0;
            var overallTested = 0;
            var overallVaccinated1 = 0;
            var overallVaccinated2 = 0;

            // Iterating to get data 
            for(var res in responseData)
            {
                var stateName = res;
                var stateConfirmed = responseData[res]['total'].confirmed;
                var stateDeceased = responseData[res]['total'].deceased;
                var stateRecovered = responseData[res]['total'].recovered;
                var stateTested = responseData[res]['total'].tested;
                var stateVaccinated1 = responseData[res]['total'].vaccinated1;
                var stateVaccinated2 = responseData[res]['total'].vaccinated2;
                // Avoiding Unknown State
                if(res!='TT')
                {
                    overallConfirmed = overallConfirmed + stateConfirmed;
                    overallDeceased = overallDeceased + stateDeceased;
                    overallRecovered = overallRecovered + stateRecovered;
                    overallTested = overallTested + stateTested;
                    overallVaccinated1 = overallVaccinated1 + stateVaccinated1;
                    overallVaccinated2 = overallVaccinated2 + stateVaccinated2;
                }
                
                
            }
            setOverallData(
                {
                    "confirmed":overallConfirmed,
                    "deceased":overallDeceased,
                    "recovered":overallRecovered,
                    "tested":overallTested,
                    "vaccinated1":overallVaccinated1,
                    "vaccinated2":overallVaccinated2
                }
            )
            
        })
        .catch(function (error) {
            console.log(error);
        });

    },[])

    // Function to Display State wise Data

    const DisplayStateList = () => {
        return(
            <div>
                <table border={1} style={{width:"100%"}}>
                    <tr>
                        <th>State</th>
                        <th>Confirmed</th>
                        <th>Deceased</th>
                        <th>Recovered</th>
                        <th>Tested</th>
                        <th>1st Dose Vaccination</th>
                        <th>2nd Dose Vaccination</th>
                    </tr>
                    
                    {
                        Object.keys(originalData).map((data)=>(
                            (data!='TT')?
                                <tr>
                                    <td>{data}</td>
                                    <td>{originalData[data]['total'].confirmed}</td>
                                    <td>{originalData[data]['total'].deceased}</td>
                                    <td>{originalData[data]['total'].recovered}</td>
                                    <td>{originalData[data]['total'].tested}</td>
                                    <td>{originalData[data]['total'].vaccinated1}</td>
                                    <td>{originalData[data]['total'].vaccinated2}</td>
                                </tr>
                            :
                                ''
                        ))
                    }
                    
                </table>
                
            </div>
            
        )
    }

    return(
        <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}>
            <h1>Covid 19 India Tracker</h1>
            <h3>Overall Status</h3>
            <table border={1} style={{width:"100%"}}>
                <tr>
                    <th>Confirmed</th>
                    <th>Deceased</th>
                    <th>Recovered</th>
                    <th>Tested</th>
                    <th>1st Dose Vaccination</th>
                    <th>2nd Dose Vaccination</th>
                </tr>
                <tr>
                    <td>{overallData.confirmed}</td>
                    <td>{overallData.deceased}</td>
                    <td>{overallData.recovered}</td>
                    <td>{overallData.tested}</td>
                    <td>{overallData.vaccinated1}</td>
                    <td>{overallData.vaccinated2}</td>
                </tr>
            </table>
            <br/>
            <h3>State Wise Status</h3>
            <DisplayStateList />
        </div>
    );
}

export default Covid19IndiaTracker;