import React, { useState } from "react";
import axios from "axios";
import { Cloud, Sun, CloudRain, CloudFog } from "lucide-react";
import { Moon, CloudSun, CloudMoon } from "lucide-react"

function App() {

    const [mycity, setmycity] = useState("");
    const [myweather, setmyweather] = useState("");
    const [mytemp, setmytemp] = useState("");
    const [mydescrp, setmydescrp] = useState("");
    const [myhumidity, setmyhumidity] = useState("");
    const [mywindspeed, setmywindspeed] = useState("");
    const [showweather, setshowweather] = useState(false);
    const [currenttime, setcurrenttime] = useState("")
    const [sunrise, setsunrise] = useState("")
    const [sunset, setsunset] = useState("")


    function selectcity(eve) {
        setmycity(eve.target.value);
    }

    function handlechange() {

        axios(
            `https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=da602df3ecc066969b43b39f0c1eac27&units=metric`
        )

            .then(function (success) {

                console.log(success.data);

                setmyweather(success.data.weather[0].main);
                setmytemp(success.data.main.temp);
                setmydescrp(success.data.weather[0].description);
                setmyhumidity(success.data.main.humidity);
                setmywindspeed(success.data.wind.speed);
                setcurrenttime(success.data.dt)
                setsunrise(success.data.sys.sunrise)
                setsunset(success.data.sys.sunset)


                setshowweather(true);

            })

            .catch(function (Failed) {

                console.log(Failed);

                alert("City not found, Please Enter Your City");

                setshowweather(false);
            });
    }
    const isDay = currenttime >= sunrise && currenttime < sunset;

    const weatherIcon = () => {

        if (myweather === "Clouds") {
            return <Cloud size={35} />;
        }

        else if (myweather === "Rain") {
            return <CloudRain size={35} />;
        }

        else if (myweather === "Clear") {
            return <Sun size={35} />;
        }

        else if (myweather === "Mist") {
            return <CloudFog size={35} />;
        }

    };
    const daynytIcon = () => {
        if (myweather === "Clear") {
            return isDay ? <Sun size={70} /> : <Moon size={70} />;
        }

        if (myweather === "Clouds") {
            return isDay
                ? <CloudSun size={70} />
                : <CloudMoon size={70} />;
        }
    };
    return (

        <div className="bg-[#181934] min-h-screen flex items-center justify-center p-4">

            <div className="bg-slate-500/20 backdrop-blur-lg w-full max-w-md mx-auto flex flex-col gap-6 border border-white/20 rounded-3xl p-6 shadow-2xl">

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-white text-center">
                    Weather Report
                </h1>

                {/* INPUT */}
                <input
                    onChange={selectcity}
                    type="text"
                    placeholder="Enter your location"
                    className="p-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder:text-gray-300 outline-none"
                />

                {/* BUTTON */}
                <button
                    onClick={handlechange}
                    className="bg-blue-500 hover:bg-blue-600 transition rounded-xl p-3 text-white font-semibold"
                >
                    Search
                </button>

                {/* WEATHER CARD */}

                {showweather && (

                    <section className="bg-white/10backdrop-blur-lgrounded-3xlp-6text-centerborderborder-white/20shadow-2xlanimate-fadeIntransition-allduration-500">


                        {/* CITY */}


                        <h2 className="text-3xl font-bold text-white">

                            {mycity}
                        </h2>




                        {/* WEATHER */}

                        <div className="flex items-center gap-2 text-white justify-between">
                            <div className="flex items-center gap-2">
                                {weatherIcon()}
                                <p className="text-2xl text-gray-300 mt-2">
                                    {myweather} </p></div>



                            <div>
                               {daynytIcon()}
                            </div>
                        </div>

                        {/* TEMP */}
                        <h3 className="text-7xl font-bold text-white mt-4">
                            {mytemp}°C
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-gray-300 text-xl capitalize mt-3">
                            {mydescrp}
                        </p>

                        {/* WEATHER INFO */}
                        <div className="grid grid-cols-2 gap-4 mt-8">

                            {/* HUMIDITY */}
                            <div className="bg-white/10 p-5 rounded-2xl">

                                <h4 className="text-gray-300 text-lg">
                                    Humidity
                                </h4>

                                <p className="text-3xl text-white font-bold mt-2">
                                    {myhumidity}%
                                </p>

                            </div>

                            {/* WIND SPEED */}
                            <div className="bg-white/10 p-5 rounded-2xl">

                                <h4 className="text-gray-300 text-lg">
                                    Wind Speed
                                </h4>

                                <p className="text-3xl text-white font-bold mt-2">
                                    {mywindspeed} km/h
                                </p>

                            </div>

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
}

export default App;
