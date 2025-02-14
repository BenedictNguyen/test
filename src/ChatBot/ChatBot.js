import React, { useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat'; 
import CloseIcon from '@mui/icons-material/Close'; 
import '../ChatBot/ChatBot.css';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [isVisible, setIsVisible] = useState(true); 

    const defaultMessages = [
        { text: "Hi there! How can I assist you today?", isUser: false },
        { text: "You can ask me about courses, registration, or anything else.", isUser: false },
    ];

    useEffect(() => {
        // Hiển thị tin nhắn mặc định sau 1 giây khi ChatBot được mở
        const timer = setTimeout(() => {
            setMessages(defaultMessages);
        }, 1000); 
        return () => clearTimeout(timer);
    }, []);

    // Hàm gửi tin nhắn đến mock API
    const sendToAdminAPI = async (message) => {
        try {
            const response = await fetch('https://676cffa90e299dd2ddfe11f1.mockapi.io/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message, isUser: true }), // Dữ liệu gửi lên API
            });

            if (!response.ok) {
                throw new Error('Không thể gửi tin nhắn tới admin');
            }

            const result = await response.json();
            console.log('Đã gửi thông báo tới admin:', result); // In ra kết quả từ API
        } catch (error) {
            console.error('Lỗi gửi tin nhắn:', error); // Xử lý lỗi nếu có
        }
    };

    // Xử lý khi người dùng gửi tin nhắn
    const handleSendMessage = (message) => {
        // Cập nhật tin nhắn mới vào trạng thái messages
        setMessages(prevMessages => [...prevMessages, { text: message, isUser: true }]);
        
        // Gửi tin nhắn đó lên mock API
        sendToAdminAPI(message);
    };

    // Hàm đóng/mở ChatBox
    const toggleChatBox = () => {
        setIsVisible(!isVisible);
    };

    // Mở ChatBox khi người dùng nhấn vào icon
    const openChatBox = () => {
        setIsVisible(true);
    };

    return (
        <>
            {!isVisible && (
                <div className="chatBotIcon" onClick={openChatBox}>
                    <ChatIcon fontSize="large" />
                </div>
            )}

            {isVisible && (
                <div className="chatBox">
                    <div className="chatWindow">
                        {messages.map((message, index) => (
                            <div key={index} className={message.isUser ? 'userMessage' : 'aiMessage'}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="chatInput">
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e.target.value)}
                        />
                    </div>
                    <div className="closeIcon" onClick={toggleChatBox}>
                        <CloseIcon />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;