import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
const ReactDOM = require('react-dom')
// const ReactMarkdown = require('react-markdown')
const ReactMarkdown = require('react-markdown/with-html')

export default function ListIssue(props) {
    console.log(props)
    let htmlListIssue = props.issues.map((el, index) => {
        const markdown = `
        This block of Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">escapeHtml</code> property to false.
        `
        return (
            <div className="row" key={index}>
                <div className="col-lg-9">
                    <h4>#{el.number}<span> <a >{el.title}</a></span></h4>
                    <div>opened {el.updated_at} by {el.user.login}</div>
                        <ReactMarkdown
                            source={el.body}
                            escapeHtml={false}
                        />
                    {el.labels.map(lable => {
                        return (
                            <div>
                                <span className="rounded-pill" style={{ color: `${lable.color}` }}>{lable.name}</span>
                            </div>
                        )
                    })}
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
        <div >
            {htmlListIssue}
        </div>
    )
}
