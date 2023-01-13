import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loginCred, setLoginCred] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginCred({
      ...loginCred,
      [name]: value,
    });
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!loginCred.email || !loginCred.password) {
      toast({
        title: 'Please Fill all the Feilds!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'https://mern-chat-app-b9cl.onrender.com/api/user/login',
        loginCred,
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast({
        title: 'Registration Successful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      navigate('/chats');
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={'10px'} color="black">
      <FormControl id="email" isRequired>
        <Input
          type={'email'}
          name="email"
          placeholder="Enter Your Email"
          value={loginCred.email}
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            name="password"
            placeholder="Enter Your Name"
            value={loginCred.password}
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
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
      <Button
        variant={'solid'}
        colorScheme="red"
        width={'100%'}
        mt={10}
        color="white"
        onClick={() => {
          setLoginCred({
            email: 'guest@mail.com',
            password: '123456',
          });
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
