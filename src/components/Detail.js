import React from 'react';
import Figure from 'react-bootstrap/Figure';

const Detail = ({ user }) => {
  return (
    <div  >
      <Figure  >
        <Figure.Image
          src={user.avatar}
          alt={`image of ${user.name}`}
          style={{ height: '6rem' }}
          className='img-fluid rounded-circle'
        />
        <p className='text-center font-weight-bolder text-primary h4 mt-2' >
            {user.name}
        </p>
      </Figure>
    </div>
  );
};

export default Detail;
