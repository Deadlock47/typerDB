
import {IoClipboardOutline} from 'react-icons/io'
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { toast } from 'react-toastify';
import { app } from './db';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
export default function Item({data}){
    // console.log(typeof data.date)
    return (
        <div className="bg-neutral-700 w-auto m-10 rounded-xl px-3 pb-4 pt-4 h-fit ">
            <div className="title flex flex-row justify-between p-2 px-3  ">
                <h2 className="font-bold text-2xl"> {data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h2>
                <h5>{data.date?.slice(0,16)}</h5>
            </div>
            <div className="content bg-neutral-800 p-3 rounded-xl   overflow-hidden ">
                {
                    data.text.length > 150 ? data.text.slice(0,650) + '...' : data.text 
                }
            </div>
            <div className="btns flex gap-3">
                <div onClick={()=>{
                     navigator.clipboard.writeText(data.text);
                     toast.success("copied to clipboard")
                }} className='bg-black p-2 cursor-pointer flex gap-3 text-xl rounded-lg mt-3   w-fit '>
                <HiOutlineClipboardDocumentList></HiOutlineClipboardDocumentList>
                <div className='text-base'>Copy To ClipBoard</div>
                </div>
                
                <div onClick={async ()=>{
                    const db = getFirestore(app);
                    await deleteDoc(doc(db, "stories" , data.title));
                    location.reload();
                }}   className=' p-2 flex cursor-pointer bg-red-700 gap-3 text-xl rounded-lg mt-3   w-fit '>
                <RiDeleteBin6Line></RiDeleteBin6Line>
                <div className='text-base'>Delete</div>
                </div>
            </div>
        </div>
    )
}