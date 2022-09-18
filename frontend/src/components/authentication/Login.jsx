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

const Login = () => {
  return (
    <VStack spacing={'5px'} color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={'email'}
          placeholder="Enter Your Email"
          onChange={(e) => {
            //   handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            //   type={show ? 'text' : 'password'}
            placeholder="Enter Your Name"
            onChange={(e) => {
              //     handelChange(e);
            }}
          />
          <InputRightElement width={'4.5rem'}>
            <Button
              h={'1.7rem'}
              size="sm"
              onClick={() => {
                //  setShow(!show);
              }}
            >
              {/* {Show ? 'Hide' : 'Show'} */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={'100%'}
        mt={15}
        //  onClick={submitHandler}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Login;
