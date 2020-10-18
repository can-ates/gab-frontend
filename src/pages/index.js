import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Crood from '../assets/croods.png';

import Auth from '../hoc/Auth'

const Home = () => {
  return (
    <Container className='m-auto container-md vh-100'>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col sm={6}>
          <Row>
            <Image fluid className='' src={Crood} />
          </Row>
        </Col>
        <Col sm={6}>
          <Row className='text-center'>
            <Card className='w-100 m-auto border-0' style={{ maxWidth: '30em' }}>
              <Card.Body>
                <Card.Title className='text-uppercase text-info'>
                  {' '}
                  use social accounts to log in{' '}
                </Card.Title>

                <div className='mt-5 d-flex flex-column align-items-center h-100'>
                  <Button className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href='http://localhost:3030/oauth/google'
                  >
                    <i className='fab font-weight-bolder font fa-google text-white' />
                    <p className='text-white my-0 text-uppercase font-weight-bold'>
                      Sign up with google
                    </p>
                  </Button>
                  <Button className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href='http://localhost:3030/oauth/facebook'
                  >
                    <i className='fab font-weight-bolder fa-facebook-f' />
                    <p className='text-white my-0 text-uppercase font-weight-bold'>
                      Sign up with facebook
                    </p>
                  </Button>
                  <Button className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href='http://localhost:3030/oauth/github'
                  >
                    <i className='fab font-weight-bolder fa-github' />
                    <p className='text-white my-0 text-uppercase font-weight-bold '>
                      Sign up with github
                    </p>
                  </Button>
                  <Button className='border-0  bg-info d-flex justify-content-around align-items-center my-2 w-75 p-3 rounded'
                    href='http://localhost:3030/oauth/twitter'
                  >
                    <i className='fab font-weight-bolder fa-twitter' />
                    <p className='text-white my-0 text-uppercase font-weight-bold '>
                      Sign up with twitter
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

export default Auth(Home)
