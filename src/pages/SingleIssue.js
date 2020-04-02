import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import {useParams} from 'react-router-dom'
const ReactMarkdown = require('react-markdown/with-html')

export default function SingleIssue(props) {
    const {owner, repos, number} = useParams()
    const [comments, setComments] = useState([]);
    const [singleIssue, setSingleIssue] = useState({})
    const [newCommentText, setNewCommentText] = useState('');
    const [loading,setLoading] = useState (false);

    const fetchComments = async () => {
        let url = `https://api.github.com/repos/${owner}/${repos}/issues/${number}/comments`;
        let respone = await fetch(url, {
            method: 'GET',
        })
        let result = await respone.json()
        console.log(result)
        setComments(result)
    }
    useEffect(() => {
        fetchSingleIssue()
        fetchComments()
    }, [])

    const fetchSingleIssue = async () => {
        let url = `https://api.github.com/repos/${owner}/${repos}/issues/${number}`
        let respone = await fetch(url, {
            method: 'GET',
        })
        let result = await respone.json()
        setSingleIssue(result)
    }
    

    return (
        <div className="container mt-3">
            <h1>EveryIssue component</h1>
            <div>
                <p> number: {singleIssue.number} + Title: {singleIssue.title} </p>

                <p> State: {singleIssue.state}</p>

                <ReactMarkdown
                    source={singleIssue.body}
                    escapeHtml={false}
                />
                <input className="p-1 rounded" value={newCommentText} onChange={(event) => {
                    setNewCommentText(event.target.value)
                }} />
                <button type="button" class="btn btn-success mx-2" onClick={async () => {
                    setLoading (true);
                    let url = `https://api.github.com/repos/${owner}/${repos}/issues/${number}/comments`;
                    let respone = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `token ${props.token}`
                        },
                        body: JSON.stringify({ body: newCommentText })
                    })
                    let result = await respone.json()
                    setTimeout(()=>{
                        fetchComments().then(()=>{
                            setLoading(false)
                        })
                    },3000)
                }}> Add New Comment </button>

                <button type="button" class="btn btn-warning" onClick={()=>{
                    setLoading(true);
                    fetchComments().then(()=>{
                        setLoading(false)
                    })
                }}> Reload Comment </button>

                <p> Comment: {singleIssue.comments} </p>
                {loading?"loading...":comments.map((item) => {

                    return (

                        <div className="rounded" style={{ border: "1px solid grey" }} key={item.id}>
                            <ReactMarkdown className="p-3"
                                source={item.body}
                                escapeHtml={true}
                            />
                        </div>

                    )
                })}

            </div>
        </div>
    )
}
