import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarSearch from './components/NavBarSearch'
import Repositories from './components/Repostories'
import ListIssue from './components/ListIssue'
import Pagination from "react-js-pagination";
const ReactDOM = require('react-dom')
// const ReactMarkdown = require('react-markdown')
// const ReactMarkdown = require('react-markdown/with-html')
// const React = require('react')




const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
    const [token, setToken] = useState(null)
    let [view, setView] = useState('landing')
    let [searchTerm, setSearchTerm] = useState('')
    let [page, setPage] = useState(1)
    let [repos, setRepos] = useState([])
    let [issues, setIssues] = useState([])
    let [total, setTotal] = useState(null)
    useEffect(() => {
        const existingToken = localStorage.getItem('token');
        const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("&scope")[0].split('access_token=')[1] : null;

        if (!accessToken && !existingToken) {
            window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
        }

        if (accessToken) {
            console.log(`New accessToken: ${accessToken}`);

            localStorage.setItem("token", accessToken);
            setToken(accessToken)
        }

        if (existingToken) {
            setToken(existingToken)
        }
    },
        [])
    let handlePageChange = (page) => {
        setPage(page)
        fetchSearch(searchTerm, page)
    }

    const fetchSearch = async (searchTerm, page) => {
        let url = `https://api.github.com/search/repositories?q=${searchTerm}&page=${page}`
        let respone = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.github.mercy-preview+json'
            },
        })
        let result = await respone.json()
        console.log(result)
        setRepos(result.items)
        setTotal(result.total_count)
        console.log(result.items)
        
    }
    const fetchReposIssue = async (fullname) => {
        setView('listIssue')
        let url = `https://api.github.com/repos/${fullname}/issues`
        let respone = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.github.scarlet-witch-preview+json'
            },
        })
        let result = await respone.json()
        console.log('listIssue',result)
        setIssues(issues.concat(result))
        console.log(issues)
    }

    const showView = () => {
        if(view === 'landing') {
            return showRepos()
        }
        else if (view === 'listIssue') {
            return (
                <ListIssue issues={issues}/>
            )
        }
    }

    const showRepos = () => {
        if (repos !== null && repos.length === 0) {
            return (
                <div>Loading..</div>
            )
        } else {
            return (
                <div>
                    <h3>Total Result:{total} </h3>
                    <Repositories repos={repos} fetchReposIssue={fetchReposIssue}/>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={page}
                        itemsCountPerPage={30}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
            )
        }
    }




    console.log(searchTerm)
    // console.log(token)
    return (
        <div>
            <NavBarSearch
                fetchSearch={fetchSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-9">
                    {showView()}
                </div>
            </div>

        </div>
    );
}

export default App;
