import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

const Signup = () => {
  const [signupData, setSignUpdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avtar: '',
  });
  const [show, setShow] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
  };
  const submitHandler = () => {};
  return (
    <VStack spacing={'5px'} color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={'email'}
          placeholder="Enter Your Email"
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
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
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
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
      <FormControl id="avtar" isRequired>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type={'file'}
          p={1.5}
          accept={'image/*'}
          placeholder="Enter Your Name"
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <Button colorScheme="blue" width={'100%'} mt={15} onClick={submitHandler}>
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;
