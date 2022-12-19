import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      borderRadius="lg"
      my={.5}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.avtar}
      />
      <Text>{user.name}</Text>
      <Text fontSize="xs">
        <b>Email: </b>
        {user.email}
      </Text>
    </Box>
  );
};

export default UserListItem;
