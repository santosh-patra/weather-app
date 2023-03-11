import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Inputs({setQuery,units,setUnits}) {
     const [city, setCity] = useState('')
     let handleSearchClick = ()=>{
          if(city!=='') setQuery({q:city})
     }

     let handleLocationClick = ()=>{
          if(navigator.geolocation){
               toast.info('Fetching users location.')
               navigator.geolocation.getCurrentPosition((position)=>{
                    toast.success("Location Fetched.")
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude
                    setQuery({lat,lon})
                    setCity('')
               })
          }
     }

     let handleUnitsChange = (e)=>{
          const selectedUnit = e.currentTarget.name;
          if(units !== selectedUnit) setUnits(selectedUnit)
     }
 return (
  <div className="flex flex-row justify-center my-6">
   <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
    <input
     type="text"
     value={city}
     onChange={e=>setCity(e.currentTarget.value)}
     placeholder="Search for city"
     className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
    />
    <UilSearch size={25} onClick={handleSearchClick} className="text-white cursor-pointer transition ease-out hover:scale-125" />
    <UilLocationPoint size={25} onClick={handleLocationClick} className="text-white cursor-pointer transition ease-out hover:scale-125" />
   </div>

   <div className="flex flex-row w-1/4 items-center justify-center ">
        <button name="metric" onClick={handleUnitsChange}  className="text-xl font-light text-white transition ease-out hover:scale-125">°C</button>
        <p className="text-xl text-white mx-1">|</p>
        <button name="imperial" onClick={handleUnitsChange} className="text-xl font-light text-white transition ease-out hover:scale-125">°f</button>
   </div>
  </div>
 );
}

export default Inputs;
