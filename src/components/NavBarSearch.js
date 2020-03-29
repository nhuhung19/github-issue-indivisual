import React from 'react'
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'

export default function NavBarSearch(props) {
   let onChange = (e) => {
    props.setSearchTerm(e.target.value)
   }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Github Issue</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline onSubmit={(e) => {
                    e.preventDefault()
                    props.fetchSearch(props.searchTerm)
                    }}>
                    <FormControl onChange={onChange} value={props.searchTerm} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button type="submit" variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    )
}
