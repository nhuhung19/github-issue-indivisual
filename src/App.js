import React, {useEffect, useState} from 'react'
// import NavBarSearch from './components/NavBarSearch'
import HomePage from './pages/HomePage'
import AddNewIssue from './pages/AddNewIssue'
import ListIssuePage from './pages/ListIssuePage'
import SingleIssue from './pages/SingleIssue'
import { Switch, Route } from 'react-router-dom'


const clientId = process.env.REACT_APP_CLIENT_ID;
export default function App() {
    const [token, setToken] = useState(null)
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
    return (
        <div>
            {/* <NavBarSearch /> */}
            <Switch>
                <Route path="/" exact render={() => <HomePage />} />
                <Route path="/listissue/:owner/:repos" render={(props) => <ListIssuePage token={token} {...props}/>} />
                <Route path="/singleissue/:owner/:repos/:number" render={(props) => <SingleIssue token={token} {...props}/>} />
                <Route path="/addnewissue/:owner/:repos" exact render={(props) => <AddNewIssue token={token} {...props} />} />
            </Switch>
        </div>
    )
}
