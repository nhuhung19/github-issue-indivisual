import React, {useEffect, useState} from 'react'
import ListIssue from '../components/ListIssue'
import {useParams} from 'react-router-dom'

export default function ListIssuePage(props) {
    
    console.log(props)

    let {owner, repos} = useParams()
    // debugger
    let [issues, setIssues] = useState([])
    useEffect(() => {
        fetchReposIssue()
    },[])

    const fetchReposIssue = async () => {
        // let fullName = issueName
        let url = `https://api.github.com/repos/${owner}/${repos}/issues`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.github.machine-man-preview',
                Authorization: `token ${props.token}`
            },
        })
        console.log(response)
        let result = await response.json()
        console.log('listIssue', result)
        setIssues(result)
    }
    return (
        <div>
            <ListIssue owner={owner} repos={repos} issues={issues}/>
        </div>
    )
}
