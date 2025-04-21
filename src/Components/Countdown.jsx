import React from 'react'
import { useState, useEffect, useRef } from 'react'

function Countdown() {

    const times = {
        hour:'',
        minute:'',
        second:'',
    }

    const [timeDisplay,setTimeDisplay] = useState(false)
    const [inputChange, setInputChange] = useState(times)
    const [secondInput, setSecondInput] = useState(null)
    const [minuteInput, setMinuteInput] = useState(null)
    const [hourInput, setHourInput] = useState(null)
    const [startButtonText, setStartButtonText] = useState('Start')


    const [isRunning, setIsRunning] = useState(false)
    const [runningTime, setRunningTime] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(null)
    const startTimeRef = useRef(null)
    const userInputRef = useRef(null)
    const intervalIdRef = useRef(null)
    const dateRef = useRef(null)

    const [showMilliZ, setShowMilliZ]  = useState(0)
    const [showSecondZ, setShowSecondZ] = useState(0)
    const [showMinuteZ, setShowMinuteZ] = useState(0)
    const [showHourZ, setShowHourZ] = useState(0)
    // const [increaseTime, setIncreaseTime] = useState(0)



    useEffect(()=>{

        dateRef.current = Date.now()

        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(startTimeRef.current - (Date.now()-dateRef.current))
            }, 100)
        }

        return()=> {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])


    // useEffect(()=>{

    //     if(!isRunning){
    //         startTimeRef.current = increaseTime
    //     }

    // },[isRunning, increaseTime])


    // console.log(startTimeRef.current)
    // console.log(dateRef.current)
    // console.log(increaseTime)
    // console.log(elapsedTime)


    function handleInputChange(e){
        setInputChange({
            ...inputChange, [e.target.name]: e.target.value,
        })
    }

    // console.log(inputChange)


    function setInput(){

        if(inputChange.hour.trim() || inputChange.minute.trim() || inputChange.second.trim()){

            setTimeDisplay(true)

            setHourInput(inputChange.hour)
            setMinuteInput(inputChange.minute)
            setSecondInput(inputChange.second)

        }
        else{
            alert('You have to 1st put your time!!')
        }

    }

    let s = Number(secondInput)
    let m = Number(minuteInput)
    let h = Number(hourInput)
    let inputSecond = (s >= 60) ? s-60 : s;
    let inputMinute;
    let inputHour = (m >= 60) ? h+1 : h;



    if(m>=60 && s>=60){
        inputMinute = (m-60)+1
    } else if(m>=60 && s<60){
        inputMinute = (m-60)
    } else if(m<60 && s>=60){
        inputMinute = m+1
    } else{
        inputMinute = m;
    }



    
    function start(){

        setRunningTime(true)
        
        
        if(startButtonText === 'Start' || startButtonText === 'Continue'){
            setStartButtonText('Pause')
            setIsRunning(true)
            userInputRef.current = ((((inputHour * 60) + inputMinute ) * 60) + inputSecond) * 1000
            startTimeRef.current = (elapsedTime === null) ? userInputRef.current : elapsedTime
        }



        if(startButtonText === 'Pause'){
            setStartButtonText('Continue')
            setIsRunning(false)
        }
        
    }


    if(elapsedTime < 0){
        setIsRunning(false)
        setElapsedTime(0)
        setStartButtonText('Start')
    }
   
   
    // console.log(startButtonText)
    // console.log(isRunning)
    // console.log(startTimeRef.current)
    // console.log(increaseTime)


    // if(isRunning === true){
    //         console.log("started")
    //     }

    //     if(isRunning === false){
    //         console.log("Stopped")
    //     }


    function reset(){
        setStartButtonText('Start')
        setIsRunning(false)
        setRunningTime(false)
        setElapsedTime(userInputRef.current)
    }

    // console.log(isRunning)


    useEffect(()=>{
        const showMilli = (elapsedTime % 1000)
        setShowMilliZ(String(showMilli).padStart(3,0))
    
        const showSecond = Math.floor(((elapsedTime / 1000) % 60))
        setShowSecondZ(String(showSecond).padStart(2,0))
    
        const showMinute = Math.floor(((elapsedTime / (1000 * 60)) % 60))
        setShowMinuteZ(String(showMinute).padStart(2,0))
    
        const showHour = Math.floor(elapsedTime / (1000*60*60))
        setShowHourZ(String(showHour).padStart(2,0))
    }, [elapsedTime])


    // console.log(showSecondZ)
    console.log(showHourZ)



  return (
    <div>
      <div className="container">
        <div className="take-input">
            <div className="input-time">
                {!timeDisplay && <div><input type="text" name='hour' size={'2'} maxLength={'2'} placeholder='00' onChange={(e) => handleInputChange(e)}/>:<input type="text" name='minute' size={'2'} maxLength={'2'} placeholder='00' onChange={(e) => handleInputChange(e)}/>:<input type="text" name='second' size={'2'} maxLength={'2'} placeholder='00' onChange={(e) => handleInputChange(e)}/></div>}
                {timeDisplay && !runningTime && <div className='start-time'>{String(inputHour).padStart(2,0)}:{String(inputMinute).padStart(2,0)}:{String(inputSecond).padStart(2,0)}<sub className='ml'>{'000'}</sub></div>}
                {timeDisplay && runningTime && <div className='start-time'>{showHourZ}:{showMinuteZ}:{showSecondZ}<sub className='ml'>{showMilliZ}</sub></div>}
            </div>
            <button onClick={setInput}>Set Time</button>
        </div>
        <div>
            {!timeDisplay && <h1 className="buttons">Set your time & start Countdown!!</h1>}
            {timeDisplay && <div className="buttons"><button className = { (startButtonText=== 'Start') ? 'start-btn' : (startButtonText === 'Pause') ? 'pause-btn' : 'continue-btn'} onClick={start}>{startButtonText}</button>
            <button className="reset-btn" onClick={reset}>Reset</button></div>}
        </div>
      </div>
    </div>
  )
}

export default Countdown




// style={{backgroundImage: (startButtonText=== 'Start') ? `linear-gradient(green, yellow)` : (startButtonText === 'Pause') ? `linear-gradient(#c62626, #c62626)` : `linear-gradient(#106810, #106810)`}}

// "start-btn"