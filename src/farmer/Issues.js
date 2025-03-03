import React, { useState } from 'react'
import API from '../api.js'
import { toast } from 'react-toastify'
// import './Issues.css'

function Issues() {
    const [issueTitle,setIssueTitle] = useState("")
    const [issueDiscription,setIssueDiscription]=useState("")

    const issuehandle = (e)=>{
        setIssueTitle(e.target.value)
    }
    const discriptionhandle = (e)=>{
        setIssueDiscription(e.target.value)
    }
    const save = async(e) =>{
        e.preventDefault()
        try{
            const {data} = await API.post("/PostIssues",{issueTitle,issueDiscription})
            console.log(data)
            toast.success("Issue posted successfully")
        }catch{
            toast.error("error in posting")
        }
    }
  return (
    <div>
      
      <form onSubmit={save}>
      <div>
        <label>IssueTitle</label>
        <input
        type='text'
        placeholder='Title of the issue'
        value={issueTitle}
        onChange={issuehandle}
        ></input>
      </div>
      <div>
        <label>issueDiscription</label>
        <input
        type='text'
        placeholder='Describe the issue'
        value={issueDiscription}
        onChange={discriptionhandle}

        ></input>
      </div>
      <div>
        <button>Send</button>
      </div>
      </form>
    </div>
  )
}

export default Issues