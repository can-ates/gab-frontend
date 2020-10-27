import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Gab from '../assets/gab_burned.png';

import Auth from '../hoc/Auth';

const Home = props => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.errors) {
      if (props.errors.message.includes('email')) setShow(true);
    }
  }, [props]);

  return (
    <Container className='m-auto container-md vh-100'>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col sm={6}>
          <Row>
            <Image
              fluid
              style={{
                width: '100%',
                maxWidth: '35em',
                margin: 'auto',
              }}
              src={Gab}
            />
          </Row>
        </Col>
        <Col sm={6}>
          <Row className='text-center'>
            <Card
              className='w-100 m-auto border-0'
              style={{ maxWidth: '30em' }}
            >
              <Card.Body>
                <Card.Title className='text-uppercase text-info'>
                  {' '}
                  use social accounts to log in{' '}
                </Card.Title>
                {show && (
                  <Alert
                    variant='danger'
                    onClose={() => setShow(false)}
                    dismissible
                    className='rounded-lg'
                  >
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>User already exists</p>
                  </Alert>
                )}

                <div className='mt-5 d-flex flex-column align-items-center h-100'>
                  <Button
                    className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href={process.env.REACT_APP_GOOGLE}
                  >
                    <i className='fab font-weight-bolder font fa-google text-white' />
                    <p className='text-white my-0 text-uppercase font-weight-bold'>
                      Sign up with google
                    </p>
                  </Button>
                  <Button
                    className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href={process.env.REACT_APP_FACEBOOK}
                  >
                    <i className='fab font-weight-bolder fa-facebook-f' />
                    <p className='text-white my-0 text-uppercase font-weight-bold'>
                      Sign up with facebook
                    </p>
                  </Button>
                  <Button
                    className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href={process.env.REACT_APP_GITHUB}
                  >
                    <i className='fab font-weight-bolder fa-github' />
                    <p className='text-white my-0 text-uppercase font-weight-bold '>
                      Sign up with github
                    </p>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth(Home);
