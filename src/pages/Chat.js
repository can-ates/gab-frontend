import React from 'react';

//BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

//REDUX
import { useSelector } from 'react-redux';

//COMPONENTS
import Tab from '../components/Tab/';
import Messenger from '../components/Messenger/';
import Detail from '../components/Detail/';
import Auth from '../hoc/Auth';

const Chat = () => {
  const user = useSelector(state => state.user.user);

  return (
    <Container fluid='xl' className='chat' >
      <Row  >
        <Col
          style={{
            zIndex: 5,
          }}
          md={1}
          
          className='d-md-flex justify-content-center d-none '
        >
          <Tab />
        </Col>
        <Col md={8}
          xs={12}
        >
          <Messenger />
        </Col>
        <Col md={3}  className='d-md-flex justify-content-center mt-2 d-none '>
          <Detail user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth(Chat);
