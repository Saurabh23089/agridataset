import {Container, Alert} from '@mantine/core';

const Error = ({error}) => {
    return (
        <Container>
        <Alert title="Error" color="red">
          {error.message}
        </Alert>
      </Container>
    )
}

export default Error;