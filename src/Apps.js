import { useState } from "react"
import axios from "axios"
function App() {

  const [mycity, setmycity] = useState(" ")
  const[myweather, setmyweather] = useState("")
  const[mytemp, setmytemp]=useState("")
  const[mydescrp, setmydescrp] = useState("")

  function selectcity(eve) {
    setmycity(eve.target.value)
  }

  function handlechange() {
    var data = axios(`https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=da602df3ecc066969b43b39f0c1eac27`)
    data.then(function (success) {
      console.log(success.data)
          setmyweather(success.data.weather[0].main)
          setmytemp(success.data.main.temp)
          setmydescrp(success.data.weather[0].description)

    })



      .catch(function (Failed) {
        console.log(Failed)
      })
  }


  return (
    <div className="bg-black p-20">
      <div className="bg-green-600 p-20">
        <div className=" flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold">Weather Report</h1>
          <p className="font-extrabold">I can give you a weather report about your city</p>
          <input onChange={selectcity} type="text" placeholder="Enter your city " className="w-40  border rounded-md p-1 bg-[#ECE9E2]"></input>
          <button onClick={handlechange} className="bg-black w-24 text-white p-1 rounded-md text-sm">Get Report</button>

          <p className="font-extrabold">Weather : {myweather}</p>
          <p className="font-extrabold">Temperature : {mytemp}</p>
          <p className="font-extrabold">Description : {mydescrp}</p></div>

      </div>

    </div>
  )
}

export default App
