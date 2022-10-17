import {
  Button,
  FormControl,
  FormLabel,
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

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [signupCred, setSignUpcred] = useState({
    name: '',
    email: '',
    password: '',
    avtar: '',
  });
  const [confirmPass, setConfirmPass] = useState('');

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setSignUpcred({
      ...signupCred,
      [name]: value,
    });
  };
  const imageUpload = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'sandesh');
      data.append('cloud_name', 'dazqqhehe');
      fetch('https://api.cloudinary.com/v1_1/dazqqhehe/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSignUpcred({ ...signupCred, avtar: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (
      !signupCred.name ||
      !signupCred.email ||
      !signupCred.password ||
      !confirmPass
    ) {
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
    if (signupCred.password !== confirmPass) {
      toast({
        title: 'Passwords Do not Match!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      console.log(signupCred);
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/user/register',
        signupCred,
        config
      );
      console.log('data: ', data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast({
        title: 'Registration Successful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      // navigate('/chats');
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
    <VStack spacing={'5px'} color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter Your Name"
          onChange={(e) => {
            handelChange(e);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
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
            name="password"
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
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
            placeholder="Enter Your Password Again"
            onChange={(e) => {
              setConfirmPass(e.target.value);
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
            imageUpload(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={'100%'}
        mt={15}
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Signup;
