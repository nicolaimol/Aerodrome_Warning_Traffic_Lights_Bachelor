import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Testlist.css';

function Testlist() {

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
    
      useEffect(() => {
        axios.get("https://aa043aa717wu6655h.api.met.no/weatherapi/locationforecast/2.0/complete?altitude=100&lat=60&lon=10")
        .then(response => {
          console.log(response)
          setMelding(response.data);
          
        })
      }, [])

      let colour ="";
      if (melding.properties.timeseries[0].data.instant.details.air_temperature > 0 ) {
          colour = "green";
      } else if (melding.properties.timeseries[0].data.instant.details.air_temperature < 0) {
          colour = "red";
      } else {
          colour = "yellow";
      }

      const classes = 'Testlist ${colour}';

  return <div className='Testlist' style={{"backgroundColor": `${colour}`}}>
        <table>
            <tr>
                <th>Klokke</th>
                <th>Temperatur</th>
            </tr>

            {melding.properties.timeseries.map((item, i) => {
            return <tr><td>{item.time}</td><td>{item.data.instant.details.air_temperature}</td></tr>
        })}
        
      </table>
    </div>;
}

export default Testlist;
