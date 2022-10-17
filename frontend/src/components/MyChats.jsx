import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { ChatState } from '../context/ChatProvider';

const MyChats = () => {
  const [loggedUser, setLoogedUser] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('api/chat', config);
      setChats(data);
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: 'Faild to Load the Chats!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };
  return <div>MYChat</div>;
};

export default MyChats;
