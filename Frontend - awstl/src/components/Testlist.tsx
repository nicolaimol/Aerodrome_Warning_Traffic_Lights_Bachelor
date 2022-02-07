import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Testlist.css';

function Testlist() {

  /*
      let colour ="";
      if (melding.properties.timeseries[0].data.instant.details.air_temperature > 0 ) {
          colour = "green";
      } else if (melding.properties.timeseries[0].data.instant.details.air_temperature < 0) {
          colour = "red";
      } else {
          colour = "yellow";
      }
  */

    interface timeseriesList {
        time:string,
        data:{
          instant:{
            details:{
              air_temperature:number
            }
          }
        }
      }
    
      interface forecast {
    
        properties:{
          timeseries: timeseriesList[]
        }
    
      }
    
      let list:timeseriesList[] = [];
    
      list.push(
        {
          time: "",
          data: {
            instant: {
              details: {
                air_temperature: 0
              }
            }
          }
        }
      )
    
      let object: forecast = {
        properties:{
          timeseries: list
        }
      };
      const [melding, setMelding] = useState(object);
      const [temp,  setTemp] = useState(0);


      useEffect(() => {
        axios.get("/api/test")
        .then(response => {
          console.log(response)
          setMelding(response.data);
          
        })
      }, [])

      const classes = 'Testlist ${colour}';

  return <div className='Testlist'>
            <input type="range" min="-20" max="20" value={temp} onChange={e => setTemp(Number(e.target.value))}></input><span>{temp}</span>
            <table>
                <tr>
                    <th>Klokke</th>
                    <th>Temperatur</th>
                </tr>

                {melding.properties.timeseries.map((item, i) => {
                return <tr style={{"backgroundColor": `${item.data.instant.details.air_temperature > temp ? "green" 
                  : (item.data.instant.details.air_temperature < temp) ? "red" : "yellow"}`}}><td>{item.time}</td><td>{item.data.instant.details.air_temperature}</td></tr>
            })}
            
          </table>
        </div>;
}

export default Testlist;
