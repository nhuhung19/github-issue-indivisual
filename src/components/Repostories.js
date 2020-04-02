import React from 'react'
import {Link} from 'react-router-dom'
const moment = require('moment');

export default function Repostories(props) {
    const htmlItems = props.repos.map((item, index) => {
        
        return (
            <div key={index} className="row border-bottom mt-3">
                <div className="col-lg-7">
                    <h2><Link to={`/listissue/${item.full_name}`}>{item.full_name}</Link></h2>
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
