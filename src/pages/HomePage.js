import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavBarSearch from '../components/NavBarSearch'
import Repositories from '../components/Repostories'
import EveryIssue from '../components/EveryIssue';
import Pagination from "react-js-pagination";
import Modal from 'react-modal';

function HomePage() {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null)
    let [view, setView] = useState('landing')
    let [searchTerm, setSearchTerm] = useState('')
    let [page, setPage] = useState(1)
    let [repos, setRepos] = useState([])
 
    let [total, setTotal] = useState(null)

    let handlePageChange = (page) => {
        setPage(page)
        fetchSearch(searchTerm, page)
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
    

    let openModal = () => {
        setIsOpen(true);
    }

    let closeModal = () => {
        setIsOpen(false);
    }


    const showView = () => {
        if (view === 'landing') {
            return showRepos()
        }
    //     else if (view === 'listIssue') {
    //         return (
    //             <div className="row w-100">
    //                 <div className="col-lg-3"></div>
    //                 <div className="col-lg-9">
    //                     <ListIssue issues={issues}
    //                         setView={setView}
    //                         openModal={openModal}
    //                         setSelectedIssue={setSelectedIssue}
    //                     />
    //                 </div>
    //             </div>
    //         )
    //     } else if (view === 'everyIssue') {
    //         return (
    //             <EveryIssue
    //                 selectedIssue={selectedIssue}
    //                 token={token}
    //             />
    //         )
    //     }
    // }
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
                        <Repositories repos={repos} />
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
           
        </div>

    );
}

export default HomePage;
