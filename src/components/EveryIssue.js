import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
const ReactMarkdown = require('react-markdown/with-html')

export default function EveryIssue(props) {

    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading,setLoading] = useState (false);

    const fetchComments = async () => {
        let url = props.selectedIssue.comments_url;
        let respone = await fetch(url, {
            method: 'GET',
        })
        let result = await respone.json()
        setComments(result)
    }
    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div className="container mt-3">
            <h1>EveryIssue component</h1>
            <div>
                <p> number: {props.selectedIssue.number} + Title: {props.selectedIssue.title} </p>

                <p> State: {props.selectedIssue.state}</p>

                <ReactMarkdown
                    source={props.selectedIssue.body}
                    escapeHtml={false}
                />
                <input className="p-1 rounded" value={newCommentText} onChange={(event) => {
                    setNewCommentText(event.target.value)
                }} />
                <button type="button" class="btn btn-success mx-2" onClick={async () => {
                    setLoading (true);
                    let url = props.selectedIssue.comments_url;
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

                <p> Comment: {props.selectedIssue.comments} </p>
                {loading?"loading...":comments.map((item) => {

                    return (

                        <div className="rounded" style={{ border: "1px solid grey" }} key={item.id}>
                            <ReactMarkdown className="p-3"
                                // bi cai gi o day nay
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
