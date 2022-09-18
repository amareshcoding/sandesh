import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [loginCred, setLoginCred] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginCred({
      ...loginCred,
      [name]: value,
    });
  };
  return (
    <VStack spacing={'10px'} color="black">
      <FormControl id="email" isRequired>
        <Input
          type={'email'}
          placeholder="Enter Your Email"
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Name"
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <InputRightElement width={'4.5rem'}>
            <Button
              h={'1.7rem'}
              size="sm"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={'100%'}
        mt={10}
        //  onClick={submitHandler}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Login;
