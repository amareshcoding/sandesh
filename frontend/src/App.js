import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { ChatState } from './context/ChatProvider';
function App() {
  const { user } = ChatState();
  const navigate = useNavigate();
  if (!user) {
    navigate('/');
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
