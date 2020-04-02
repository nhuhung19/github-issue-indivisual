import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

export default function AddNewIssue(props) {

    let [inputTitle, setInputTitle] = useState('')
    let [inputContent, setInputContent] = useState('')
    let { owner, repos } = useParams()
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const issue = { title: inputTitle, body: inputContent };
        console.log(issue)
        try {
            const url = `https://api.github.com/repos/${owner}/${repos}/issues`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `token ${props.token}`
                },
                body: JSON.stringify(issue)
            });
            console.log(response)
            if (response.status * 1 === 422) {
                throw new Error(response.statusText = alert('Data could not be posted Error 422 Unprocessable Entity'))
            }
        } catch (error) {
            console.log(error)
        }
        alert('Create Issue Success')
        history.goBack()
    }
    return (
        <div className="container jumbotron mt-3">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input type="text" onChange={(e) => setInputTitle(e.target.value)} value={inputTitle} className="form-control" id="exampleFormControlInput1" placeholder="Title" />
                </div>

                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Content</label>
                    <textarea className="form-control" onChange={(e) => setInputContent(e.target.value)} value={inputContent} id="exampleFormControlTextarea1" rows="6"></textarea>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}
