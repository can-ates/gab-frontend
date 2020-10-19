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
    <Container fluid='xl' style={{ backgroundColor: '#F4F4F4' }}>
      <Row>
        <Col
          style={{
            zIndex: 5,
          }}
          sm={1}
          className='d-flex justify-content-center'
        >
          <Tab />
        </Col>
        <Col sm={8}>
          <Messenger />
        </Col>
        <Col sm={3} className='d-flex justify-content-center mt-2'>
          <Detail user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth(Chat);
