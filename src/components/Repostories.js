import React from 'react'
const moment = require('moment');

export default function Repostories(props) {
    const htmlItems = props.repos.map((item, index) => {
        return (
            <div key={index} className="row border-bottom mt-3">
                <div className="col-lg-7">
                    <h2 style={{ color: 'blue', cursor: 'pointer' }} onClick={() => props.fetchReposIssue(item.full_name)}>{item.full_name}</h2>
                    <div>{item.description}</div>
                    <div>Update at: {moment(item.updated_at).fromNow()}</div>
                </div>
                <div className="col-lg-3">{item.language}</div>
                <div className="col-lg-2">{item.watchers_count}</div>
                <hr />
            </div>
        )
    })
    return (
        <div>
                {htmlItems}
        </div>
    )
}
