import React from 'react'
import { iconUrlFromCode } from '../services/WeatherService'

function Forecast({title,items}) {
  return (
    <div>
        <div className='flex justify-start items-center mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'></hr>
        <div className='flex flex-row items-center justify-between text-white'>
            {items.map((item,index)=>{
                return (
                <div key={index} className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>
                    {item.title}
                </p>
                <img src={iconUrlFromCode(item.icon)} className='w-12 my-1' alt=""></img>
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
            </div> 
            )})}

            
        </div>
    </div>
  )
}

export default Forecast