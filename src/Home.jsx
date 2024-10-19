
import { useState,useEffect } from "react"
import axios from "axios"
import iconimg from "./assets/weather3.avif"


export default function Home() {
    const apiKey="31861151b6ad4a7ea0b113639242607"
    const [locdata,setLocData] = useState({});
    const [current,setCurrent] = useState({condition:{}});
    const [forecastday,setForecastDay] = useState([{astro:{},day:{condition:{}},hour:[]}]);

    const [query,setQuery] = useState("");
    
  
    function handleSubmit(e){
      e.preventDefault();
      const url="http://api.weatherapi.com/v1/forecast.json?key="+apiKey+"&q="+query+"&days=3&aqi=no&alerts=no"
      axios.get(url).then((res)=>{console.log(res.data); setLocData(res.data.location); setCurrent(res.data.current); setForecastDay(res.data.forecast.forecastday)
      })

    }

   return (
    <>
    <div className="bg-info-subtle p-3">

      <div className="input-group w-25 m-auto">
      <input type="text" placeholder="Type City Name/Pincode" className="form-control" onChange={(e)=>{setQuery(e.target.value)}}/>
      <button className="btn btn-dark" onClick={handleSubmit}>Search</button>  
      </div>

      </div>
        <div className="bg-success-subtle p-5">
            <p className="display-6">{locdata.name}, {locdata.region}, {locdata.country}</p>
            <p  className="display-sm">{locdata.localtime}</p>
            <p className="display-3">{current.temp_c}&deg;C | {current.temp_f}&deg;F </p>
            
            <div>
            <img src={current.condition.icon} alt="" height={100} width={100}  />
            <span className="display-4">{current.condition.text}</span></div>  
            
          <br/><br/>
          

          <table className="table table-bordered">
            <tr>
              <th>Pollen</th> 
              <th>Wind</th>
              <th>Humidity</th>
              <th>Visibility</th>
              <th>Pressure</th>
              <th>Dew point</th>
       </tr>
        <tr>
          <td>{current.precip_in}</td>
          <td>{current.wind_kph}</td>
          <td>{current.humidity} </td>
          <td>{current.vis_km}</td>
          <td>{current.pressure_mb}</td>
          <td>{current.dewpoint_c}</td>
        </tr>
        </table>

        <div className="mt-3">
    <p><em>3 - day forecast</em></p>
    <div className="row">
      {
        forecastday.map((fd)=>{
          return <div className="col-4">
            <p><em>{fd.date}</em></p>
            <div className="text-center">
              <img height="50px" width="50px" src={fd.day.condition.icon} ></img>
              <h4 className="mt-1">{fd.day.avgtemp_c}&deg;C</h4>
              <p><em>{fd.day.condition.text}</em></p>
            </div>
            <p><em>Humidity : {fd.day.avghumidity}</em></p>
            <p><em>Wind : {fd.day.maxwind_kph}</em></p>
            <p><em>Visibility :{fd.day.avgvis_km}</em></p>

            <p><em>clock wise forecast</em></p>
            <div className="row">
               <div className="col-6 text-left">
                <p><em>Time</em></p>
                  {
                    fd.hour.map((hr)=>{
                      return <p><em>{hr.time}</em></p>


                    })
                  }
                </div>
                <div className="col-6 text-left">
                <p><em>Temprature</em></p>
                  {
                    fd.hour.map((tm)=>{
                      return <p><em>{tm.temp_c}</em></p>
                      

                    })
                  }
                </div>
            </div>    
    </div> })}
    </div></div></div></>

  )
}
