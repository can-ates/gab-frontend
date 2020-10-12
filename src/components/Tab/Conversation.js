import React, {useEffect} from 'react'
import Button from 'react-bootstrap/esm/Button'

const Conversation = ({conversation}) => {
    useEffect(() => {
        console.log(conversation);
    }, [])

    return (
        <Button
            style={{ borderWidth: '3px', borderColor: `${conversation.avatar}`,  color: `${conversation.avatar}` }}
            className='bg-white rounded-circle font-weight-bolder mb-2'
            size='lg'
          >
            {conversation.title.charAt(0).toUpperCase()}
          </Button>
    )
}

export default Conversation
