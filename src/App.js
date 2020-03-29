import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarSearch from './components/NavBarSearch'
import Repositories from './components/Repostories'
import ListIssue from './components/ListIssue'
import EveryIssue from './components/EveryIssue';
import Pagination from "react-js-pagination";
import Modal from 'react-modal';
const ReactDOM = require('react-dom')
const moment = require('moment');
// const ReactMarkdown = require('react-markdown')
// const ReactMarkdown = require('react-markdown/with-html')
// const React = require('react')

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
    const [token, setToken] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null)
    let [view, setView] = useState('landing')
    let [searchTerm, setSearchTerm] = useState('')
    let [page, setPage] = useState(1)
    let [repos, setRepos] = useState([])
    let [issues, setIssues] = useState([])
    let [issueName, setIssueName] = useState('')
    let [inputTitle, setInputTitle] = useState('')
    let [inputContent, setInputContent] = useState('')
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

    let onTitleChange = (e) => {
        let value = e.target.value
        setInputTitle(value)
    }

    let onContentChange = (e) => {
        let value = e.target.value
        setInputContent(value)
    }

    const onPostIssue = async (e) => {
        let fullName = issueName
        e.preventDefault()
        const issue = { title: inputTitle, body: inputContent };
        console.log(issue)
        console.log(fullName)
        try {
            const url = `https://api.github.com/repos/${fullName}/issues`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `token ${token}`
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
        setIsOpen(false);
        setTimeout(() => {
            fetchReposIssue(fullName)
        }, 3000);
    }



    const fetchSearch = async (searchTerm, page) => {
        setView('landing')
        try {
            let url = `https://api.github.com/search/repositories?q=${searchTerm}&page=${page}`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.github.mercy-preview+json'
                },
            })
            let result = await response.json()
            if (response.status * 1 === 200) {
                console.log(result)
                console.log(response)
                setRepos(result.items)
                setTotal(result.total_count)
                console.log(result.items)
            } else {
                throw new Error(response.statusText = alert('Data could not be fectched Error 422 Unprocessable Entity'))
            }
        } catch (error) {
            console.log(error)
        }

    }
    const fetchReposIssue = async (fullname) => {
        setIssueName(fullname) // nay lam gi? lúc e click vô title thì set lại fullname
        console.log("saDASDSADASDAS",issueName)
        setView('listIssue')
        let url = `https://api.github.com/repos/${fullname}/issues`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.github.VERSION.full+json'
            },
        })
        console.log(response)
        let result = await response.json()
        console.log('listIssue', result)
        
        setIssues(result)
        // console.log(issues)
    }

    let openModal = () => {
        setIsOpen(true);
    }

    let closeModal = () => {
        setIsOpen(false);
    }

    const showEveryView = () => {
        if (view === 'listIssue') {
            return (
                <EveryIssue
                    issues={issues}
                    openModal={openModal}
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                />
            )

        }
    }

    const showView = () => {
        if (view === 'landing') {
            return showRepos()
        }
        else if (view === 'listIssue') {
            return (
                <div className="row w-100">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-9">
                        <ListIssue issues={issues}
                            setView={setView}
                            openModal={openModal}
                            setSelectedIssue={setSelectedIssue}
                        />
                    </div>
                </div>
            )
        } else if (view === 'everyIssue') {
            return (
                <EveryIssue
                    selectedIssue={selectedIssue}
                    token={token}
                />
            )
        }
    }

    const showRepos = () => {
        if (repos !== null && repos.length === 0) {
            return (
                <div className="mt-auto">
                    <div className="w-100 h-100 text-center">
                        <h1>Well Come To Github Issue</h1>
                        <h3>Instruction Search:</h3>
                        <div>• Search for repositories with "repositories name"</div>
                        <div>• Jump to a user's repositories with "user/"</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row w-100">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-9">
                        <h3>Total Result:{total} </h3>
                        <Repositories repos={repos} fetchReposIssue={fetchReposIssue} />
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
                </div>
            )
        }
    }



    // console.log(token)
    return (
        <div>
            <NavBarSearch
                fetchSearch={fetchSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="w-100">
                {showView()}
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={{ overlay: { display: "flex", justifyContent: "center" }, content: { width: "70%", height: "70%", position: "relative" } }}
                    contentLabel="Example Modal"
                >
                    <form onSubmit={onPostIssue} className="w-100 h-100">
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Title Issue</label>
                            <input
                                onChange={onTitleChange}
                                name='title'
                                value={inputTitle}
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Title" />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Content</label>
                            <textarea
                                onChange={onContentChange}
                                name='content'
                                value={inputContent}
                                className="form-control w-100"
                                id="exampleFormControlTextarea1"
                                rows="8">

                            </textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Submit Issue</button>
                    </form>
                </Modal>
            </div>
        </div>

    );
}

export default App;
