import React from 'react';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        mt={'10%'}
        bg="white"
        w="80%"
        p={4}
        borderRadius="lg"
        borderWidth="10x"
      >
        <Box m={2}>
          <Text textAlign="center" fontFamily="Ms Madi" fontWeight={'bold'}>
            ChatApp
          </Text>
        </Box>
        <Box>
          <Tabs variant="enclosed">
            <TabList mb="1em">
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
