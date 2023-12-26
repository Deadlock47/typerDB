'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getStories, insertStory } from './storydb/db';
function Page() {
    const [texthin , setTexthin] = useState("");
    const [stories , setStories] = useState([]);
    useEffect(()=>{
        async function getText()
        {
            const txt =  localStorage.getItem("engtxt");
            // console.log(txt)
            setTexthin(txt);
            
            
        }
        getStories().then((response)=> setStories(response))
        getText();
    },[])
  return (
    <div className='	 w-full h-full bg-gradient-to-t from-slate-800 via-gray-900 to-black'>
        <div className="navbar  h-[calc(12%)] w-full flex  justify-between items-center p-4">
            <div className="dropdown rounded-lg">
                <button className="dropbtn">Stories</button>
                <div className="dropdown-content">
                    {
                        stories?.map((item,index)=>
                    <div className="item" key={index} >
                        <div id="box">
                            <div className="title">{item.title}</div>
                            <div className="story" >{item.text.slice(0,137) + "...."}</div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
            <div className="title font-semibold  text-2xl ">Write Your tHOughTs</div>
            <div className="history  text-center w-fit h-fit p-2 pl-6 pr-6  rounded-2xl bg-blue-900 "  ><Link href='/storydb' target='dd'>History</Link></div>
        </div>
        <div className="middle overflow-x-hidden flex justify-center items-center">
            <div className="text-write bg-transparent mt-3 ">
                <textarea defaultValue={texthin} onKeyDown={(event)=>{
                    if(event.key == " ")
                    {
                        localStorage.setItem("engtxt" ,event.currentTarget.value )
                        setTexthin(event.currentTarget.value)
                    }  

                }} className='bg-transparent border-2 rounded-2xl p-4 text-' rows={24} cols={100} ></textarea>
            </div>
        </div>
        <div className="footer overflow-x-hidden flex p-6  justify-center gap-10 ">
            <div className="btn-database  bg-blue-900 p-2.5 pl-5 pr-5 rounded-2xl" onClick={()=>{
                insertStory()
            }} >Add To Database</div>
            <div className="btn-showcount  bg-blue-900 p-2.5 pl-5 pr-5 rounded-2xl" onClick={()=>{
                const cnt = texthin.split(" ");
                // console.log(cnt)
                alert(`count of words is ${cnt.length}`)
            }}>Show Count</div>
            <div className="btn-database  bg-blue-900 p-2.5 pl-5 pr-5 rounded-2xl"  ><a href='https://deadlock47.github.io/typer/' target = "kl;k;k">Write In Hindi</a></div>
        </div>
    </div>
  )
}

export default Page