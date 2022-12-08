import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../userItems/UserListItem';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Enter a Name/Email in Search!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: 'Faild to Load the Search Result',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  const accessChat = async (id) => {
    console.log('id: ', id);
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/chat',
        { id },
        config
        );

      if (!chats.find((u) => u._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onclose();
    } catch (err) {
      toast({
        title: 'Error in fetching the chat!',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };
  return (
    <>
      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        bg={'#fff'}
        p="5px 10px"
        borderWidth={'5px'}
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant={'ghost'} onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{ base: 'none', md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={'2xl'} fontFamily="Work sans">
          SANDESH
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={'2xl'} m={1} />
            </MenuButton>
            {}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={'sm'}
                cursor="pointer"
                name={user.name}
                src={user.avtar}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display={'flex'} padding="2px">
              <Input
                placeholder="Search by Name or Email"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat ? <Spinner ml={'auto'} display="flex" /> : null}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
