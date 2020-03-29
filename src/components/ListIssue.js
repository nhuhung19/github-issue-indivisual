import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
const ReactDOM = require('react-dom')
const ReactMarkdown = require('react-markdown/with-html')
const moment = require('moment');

export default function ListIssue(props) {
    console.log(props)
    let htmlListIssue = props.issues.map((el, index) => {
        return (
            <div onClick={() => {
                props.setView('everyIssue');
                // look in el (issue9 object), see where is the issue id in this object
                props.setSelectedIssue(el) 
            }  } className="row mt-4" key={index}>
                <div className="col-lg-9">
                    <div className="card w-100 h-100">
                        <div className="card-header">
                            <h4>#{el.number}<span style={{color:'blue' , cursor: 'pointer'}}> <a>{el.title}</a></span></h4>
                            <div>opened {moment(el.updated_at).fromNow()} by <strong>@{el.user.login}</strong></div>
                        </div>
                        <div className="card-body w-100 h-100">
                            <ReactMarkdown
                                source={el.body}
                                escapeHtml={false}
                            />
                        </div>
                        <div className="card-footer text-muted">
                            {el.labels.map((lable,i) => {
                                return (
                                        <span key={i} style={{ backgroundColor: `#${lable.color}`, color: 'black' }} className="rounded-pill p-2">{lable.name}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <img className="rounded-circle" style={{ width: '75px', height: '75px' }} src={el.user.avatar_url} alt="avata" />
                    <div><strong>@{el.user.login}</strong></div>
                    <div>comment : {el.comments}</div>
                </div>
            </div>
        )
    })
    return (
        <div className="mt-2" >
            <button onClick={() => props.openModal()} type="button" className="btn btn-success">New Issue</button>
            {htmlListIssue}
        </div>
    )
}
