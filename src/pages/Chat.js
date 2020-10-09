import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

import Tab from '../components/Tab'
import Messenger from '../components/Messenger'
import Detail from '../components/Detail'
import Auth from '../hoc/Auth'

const Chat = () => {
    return (
        <Container fluid='xl' className='h-100 border border-success p-2' style={{backgroundColor :'#F4F4F4'}} >
            <Row >
                <Col sm={1} className='d-flex justify-content-center' >
                    <Tab />
                </Col>
                <Col sm={8} >
                    <Messenger />
                </Col>
                <Col sm={3}>
                    <Detail />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth(Chat)
