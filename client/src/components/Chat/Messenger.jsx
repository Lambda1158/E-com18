import React from "react";
import "./messenger.css";
import Nav from "../Profile/Nav";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";
import ChatOnline from "./ChatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { PROXY } from "../../actions";


export default function Messenger() {
  const user = useSelector((state) => state.index.user);
  console.log(user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(`${PROXY}`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${PROXY}/conversation/` + user.id
        );
        console.log(res.data);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${PROXY}/messages/` + currentChat?.id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.members.find((member) => member !== user.id);

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${PROXY}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Nav />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <p className="chatMenuInput">Chats habilitados</p>
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user.id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBowBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Mensaje..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Abre una conversación para iniciar una charla
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <div className="chatMenuInfo1">
              Ten en cuenta que sólo podras chatear con un docente luego de
              adquirir su curso.
            </div>
            <div className="chatMenuInfo2">
              Te brindamos esta herramienta para que puedas coordinar con tu
              docente una videollamada por la plataforma que deseen.
            </div>
            <div className="chatMenuInfo3">
              Ante cualquier inconveniente podes contactarnos a
              hitalent09@gmail.com
            </div>
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
