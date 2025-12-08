import React, { useEffect, useState, useRef } from "react";
import { Layout, Input, Avatar, List } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  DeleteOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { io } from "socket.io-client";
import pin from "../../../assets/image/svg/sharePin.svg";
import sendMessage from "../../../assets/image/svg/sendMessage.svg";
import emojiOpener from "../../../assets/image/svg/emojiOpener.svg";
import infoIcon from "../../../assets/image/svg/infoIcon.svg";
import pdfIcon from "../../../assets/image/png/coachroompdficon.png";
import Picker from "emoji-picker-react";
import "./CoachChatRoom.css";
import { Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import ChatGroupsUsersName from "../../Modals/ChatGroupsUsersName";

const { Sider, Content } = Layout;
const MAX_PREVIEW_IMAGES = 4;

const CoachChatRoom = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [modalMedia, setModalMedia] = useState([]);
  const [modalPdf, setModalPdf] = useState([]);
  const [pdfFileNames, setPdfFileNames] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [socket, setSocket] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const API_URL = process.env.REACT_APP_API_URL;

  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/athletecontact`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: ` ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          const uniqueAthletes = data.athletes.map((athlete) => {
            const lastMessageDate = new Date(athlete.lastMessageTime);
            const formattedTime = lastMessageDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return {
              name: athlete.fullName,
              time: formattedTime,
              message: athlete.lastMessage,
              id: athlete.id,
            };
          });

          const formattedGroups = data.groups.map((group) => ({
            groupId: group.groupId,
            groupName: group.groupName,

            groupMessages: group.messages.map((message) => {
              const messageDate = new Date(message.timestamp);
              const formattedTime = messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return {
                content: message.content,
                time: formattedTime,
                sender: message.sender,
                receiver: message.receiver,
              };
            }),

            athletes: group.athletes.map((athlete) => {
              const lastMessageDate = new Date(athlete.lastMessageTime);
              const formattedTime = lastMessageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return {
                name: athlete.fullName,
                time: formattedTime,
                message: athlete.lastMessage,
                id: athlete.id,
              };
            }),
          }));

          setContacts(uniqueAthletes);
          setGroups(formattedGroups);
        }
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  useEffect(() => {
    const socketInstance = io(API_URL, {
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      socketInstance.emit("join_chat", {
        token: localStorage.getItem("token"),
        isGroup: selectedGroup !== null ? true : false,
        groupId: selectedGroup !== null ? selectedGroup?.groupId : "",
      });
    });

    socketInstance.on("receive_message", (data) => {
      const { sender, receiver, content, timestamp, senderLabel } = data;
      // Update chat state to reflect the new message
      if (selectedGroup === null) {
        setChats((prevChats) => ({
          ...prevChats,
          [sender]: [
            ...(prevChats[sender] || []),
            {
              message: content,
              sender: "other",
              time: new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        }));
      } else {
        setChats((prevChats) => ({
          ...prevChats,
          [receiver]: [
            ...(prevChats[receiver] || []),
            {
              message: content,
              sender: senderLabel === "You" ? "You" : senderLabel,
              time: new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        }));
      }

      setContacts((prevContacts) =>
        prevContacts.map((contact) => {
          if (contact.id === sender) {
            return {
              ...contact,
              message: content,
              time: new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return contact;
        })
      );
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [selectedGroup]);

  const handleEmojiOpenerClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      typeof contact.name === "string" &&
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const imagePreviews = [];
    const videoPreviews = [];
    const pdfPreviews = [];
    const pdfFileNames = [];

    const filePromises = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          try {
            if (file.type.startsWith("image/")) {
              imagePreviews.push(reader.result);
            } else if (file.type.startsWith("video/")) {
              videoPreviews.push(reader.result);
            } else if (file.type === "application/pdf") {
              pdfPreviews.push(reader.result);
              pdfFileNames.push(file.name);
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => {
          console.error("FileReader error:", reader.error);
          reject(reader.error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then(() => {
        setModalPdf([pdfFileNames]);
        setImagePreviews(imagePreviews);
        setVideoPreviews(videoPreviews);
        setPdfPreviews(pdfPreviews);
        setPdfFileNames(pdfFileNames);
      })
      .catch((error) => {
        console.error("Error processing files:", error);
      });
  };

  const handleImageClick = (images) => {
    setModalMedia(images.map((image) => ({ type: "image", src: image })));
    setIsModalVisible(true);
  };

  const handleVideoClick = (videos) => {
    setModalMedia(videos.map((video) => ({ type: "video", src: video })));
    setIsModalVisible(true);
  };

  const handlePdfClick = () => {
    const pdfsWithNames = modalPdf.map((pdf, index) => ({
      type: "pdf",
      src: pdf,
      name: modalPdf[index] || `Document ${index + 1}`,
    }));

    setModalMedia(pdfsWithNames);
    setIsModalVisible(true);
  };

  const handleFileDelete = (index, type) => {
    if (type === "image") {
      setImagePreviews((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
      setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "video") {
      setVideoPreviews((prevVideos) =>
        prevVideos.filter((_, i) => i !== index)
      );
      setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "pdf") {
      setPdfPreviews((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
      setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handlePinClick = () => {
    document.getElementById("mediaInput").click();
  };

  const fetchMessages = async (contactId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/messages/${contactId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (data.success) {
        const formattedMessages = data.messages.map((msg) => ({
          message: msg.content,
          sender: msg.sender === contactId ? "other" : "me",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setChats((prevChats) => ({
          ...prevChats,
          [contactId]: formattedMessages,
        }));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchGroupMessages = async (groupdId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/groupmessages/${groupdId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (data.success) {
        const formattedMessages = data.messages.map((msg) => {
          const object = {
            message: msg.content,
            sender: msg.senderLabel == "You" ? "You" : `${msg.senderLabel}`,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          return object;
        });

        setChats((prevChats) => ({
          ...prevChats,
          [groupdId]: formattedMessages,
        }));

        const latestMessage = data.messages[data.messages.length - 1];
        if (latestMessage) {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact._id === groupdId
                ? {
                    ...contact,
                    message: latestMessage.content,
                    time: new Date(latestMessage.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    ),
                  }
                : contact
            )
          );
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageData = {
        receiver: selectedUser.id,
        content: message,
      };

      if (socket) {
        socket.emit("send_message", {
          token: localStorage.getItem("token"),
          messageData,
        });
      }

      setChats((prevChats) => ({
        ...prevChats,
        [selectedUser.id]: [
          ...(prevChats[selectedUser.id] || []),
          {
            message,
            sender: "me",
            time,
          },
        ],
      }));

      setMessage("");
    }
  };
  const handleGroupMessage = () => {
    if (message.trim() && selectedGroup) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageData = {
        content: message,
        receiver: selectedGroup.groupId,
      };

      if (socket) {
        socket.emit("send_message", {
          token: localStorage.getItem("token"),
          messageData,
          isGroup: true,
        });
      }

      setChats((prevChats) => ({
        ...prevChats,
        [selectedGroup.id]: [
          ...(prevChats[selectedGroup.id] || []),
          {
            message,
            sender: "You",
            time,
          },
        ],
      }));

      setMessage("");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedUser(contact);
    fetchMessages(contact.id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.name);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    fetchGroupMessages(group.groupId);
    setSelectedUser(null);
  };

  return (
    <div className="py-4">
      <h4 className="ff-gotham-bold fs_25 mb-3">Recent chats</h4>
      <Layout className="chat-layout">
        <Sider
          className={`chat-sider ${
            selectedUser || selectedGroup ? "d-none d-lg-block" : "d-block"
          }`}
        >
          <div className="search-bar">
            <Input
              placeholder="Search by chats and people"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-auto" style={{ height: "65vh" }}>
            <List
              itemLayout="horizontal"
              className="px-3 overflow-auto"
              dataSource={groups}
              renderItem={(group) => (
                <List.Item
                  key={group.groupId}
                  onClick={() => handleGroupClick(group)}
                >
                  {/* Group Information */}
                  <div className="ff-gotham-medium d-flex gap-2 align-items-center cursor-pointer">
                    {/* Group Avatar */}
                    <Avatar icon={<TeamOutlined />} />

                    {/* Group Name and Info */}
                    <div>
                      <h3
                        className="ff-gotham-medium fs_18 mb-0"
                        style={{ color: "#191B1D" }}
                      >
                        {group.groupName}
                      </h3>
                      <p
                        style={{ color: "#A0A7AF", opacity: 1 }}
                        className="fs_12 mb-0"
                      >
                        {group.athletes.length} members
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <h4 className="px-3 ff-gotham-medium fs_18">Group Contacts</h4>
            <List
              itemLayout="horizontal"
              className="px-3 overflow-auto"
              dataSource={filteredContacts}
              renderItem={(item) => (
                <List.Item onClick={() => handleContactClick(item)}>
                  <div className="ff-gotham-normal d-flex gap-2 align-items-center cursor-pointer">
                    <div>{<Avatar icon={<UserOutlined />} />}</div>
                    <div>
                      <p style={{ color: "#191B1D" }} className="mb-0">
                        {item.name}
                      </p>
                      <p
                        style={{ color: "#A0A7AF", opacity: 1 }}
                        className="fs_12 mb-0"
                      >
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p
                      style={{ color: "#A0A7AF" }}
                      className="mb-0 ff-roboto fs_14"
                    >
                      {item.time}
                    </p>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Sider>
        <Content
          className={`chat-content ${
            selectedUser || selectedGroup ? "d-block" : "d-none d-lg-block"
          }`}
        >
          {selectedUser ? (
            <>
              <div className="chat-header d-flex align-items-center gap-2">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 bg-transparent border-0 d-lg-none"
                >
                  <FaArrowLeft fontSize={16} />
                </button>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <h2
                    style={{ letterSpacing: "0.15px" }}
                    className="ff-gotham-bold fs_16 mb-0"
                  >
                    {selectedUser.name}
                  </h2>
                  <p
                    style={{ letterSpacing: "0.15px", color: "#A0A7AF" }}
                    className="mb-0 ff-gotham-normal fs_14"
                  >
                    Click Here for contact in
                  </p>
                </div>
              </div>

              <div style={{ height: "50vh" }} className="chat-messages">
                {chats[selectedUser.id] ? (
                  chats[selectedUser.id].map((chat, index) => {
                    return (
                      <div
                        key={index}
                        className={`message p-3 ${
                          chat.sender === "other" ? "me-auto" : "ms-auto"
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between gap-4">
                          <p className="ff-gotham-bold color_blue mb-0 fs_14">
                            {chat.sender === "other"
                              ? selectedUser?.name
                              : "You"}
                          </p>
                          <p
                            style={{ color: "#A0A7AF" }}
                            className="ff-gotham-normal mb-0 fs_12"
                          >
                            {chat.time}
                          </p>
                        </div>

                        {chat.images && chat.images.length > 0 && (
                          <div className="image-preview-container bg-transparent mt-3 pb-2">
                            {chat.images
                              .slice(0, MAX_PREVIEW_IMAGES)
                              .map((image, idx) => (
                                <div
                                  key={idx}
                                  className="image-preview-item cursor-pointer"
                                  onClick={() => handleImageClick(chat.images)}
                                >
                                  <img
                                    src={image}
                                    alt={`preview-${idx}`}
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                      borderRadius: "8px",
                                      marginRight:
                                        idx === chat.images.length - 1
                                          ? "0"
                                          : "0",
                                    }}
                                  />
                                  {idx === MAX_PREVIEW_IMAGES - 1 &&
                                    chat.images.length > MAX_PREVIEW_IMAGES && (
                                      <div className="image-preview-summary">
                                        <p
                                          className="ff-gotham-normal fs_14 mb-0"
                                          style={{ color: "#fff" }}
                                        >
                                          {`+${
                                            chat.images.length -
                                            MAX_PREVIEW_IMAGES
                                          } more`}
                                        </p>
                                      </div>
                                    )}
                                </div>
                              ))}
                          </div>
                        )}

                        {/* Video Previews */}
                        {chat.videos && chat.videos.length > 0 && (
                          <div className="video-preview-container bg-transparent mt-3 pb-2">
                            {chat.videos
                              .slice(0, MAX_PREVIEW_IMAGES)
                              .map((video, idx) => (
                                <div
                                  key={idx}
                                  className="video-preview-item cursor-pointer"
                                  onClick={() => handleVideoClick(chat.videos)}
                                >
                                  <video
                                    src={video}
                                    controls
                                    className="object-fit-cover"
                                    style={{
                                      width: "120px",
                                      height: "100px",
                                      borderRadius: "8px",
                                      marginRight:
                                        idx === chat.videos.length - 1
                                          ? "0"
                                          : "0",
                                    }}
                                  />
                                  {idx === MAX_PREVIEW_IMAGES - 1 &&
                                    chat.videos.length > MAX_PREVIEW_IMAGES && (
                                      <div className="video-preview-summary">
                                        <p
                                          className="ff-gotham-normal fs_14 mb-0"
                                          style={{ color: "#fff" }}
                                        >
                                          {`+${
                                            chat.videos.length -
                                            MAX_PREVIEW_IMAGES
                                          } more`}
                                        </p>
                                      </div>
                                    )}
                                </div>
                              ))}
                          </div>
                        )}

                        {/* PDF Previews */}
                        {chat.pdfs && chat.pdfs.length > 0 && (
                          <div className="pdf-preview-container bg-transparent mt-3 pb-2 d-flex align-items-center">
                            {chat.pdfs
                              .slice(0, MAX_PREVIEW_IMAGES)
                              .map((pdf, idx) => (
                                <div
                                  key={idx}
                                  className="pdf-preview-item cursor-pointer"
                                  onClick={() => handlePdfClick(chat.pdfs)}
                                >
                                  <img
                                    src={pdfIcon}
                                    alt="pdf"
                                    style={{
                                      maxWidth: "100px",
                                      maxHeight: "100px",
                                      borderRadius: "8px",
                                    }}
                                  />
                                  {idx === MAX_PREVIEW_IMAGES - 1 &&
                                    chat.pdfs.length > MAX_PREVIEW_IMAGES && (
                                      <div className="pdf-preview-summary">
                                        <p
                                          className="ff-gotham-normal fs_14 mb-0"
                                          style={{ color: "#fff" }}
                                        >
                                          {`+${
                                            chat.pdfs.length -
                                            MAX_PREVIEW_IMAGES
                                          } more`}
                                        </p>
                                      </div>
                                    )}
                                </div>
                              ))}
                          </div>
                        )}

                        <p
                          style={{ color: "#A0A7AF" }}
                          className="ff-gotham-normal mb-0 fs_12"
                        >
                          {chat.content}{" "}
                        </p>
                        <p
                          style={{ color: "#A0A7AF" }}
                          className="ff-gotham-normal mb-0 fs_12"
                        >
                          {chat.message}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex align-items-center h-100 justify-content-center">
                    <p className="mb-0 ff-gotham-bold fs_18">
                      No messages yet.
                    </p>
                  </div>
                )}
              </div>

              {imagePreviews.length > 0 ||
              videoPreviews.length > 0 ||
              pdfPreviews.length > 0 ? (
                <div className="py-4 px-5 d-flex gap-3 align-items-center">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <img
                        src={image}
                        className="object-fit-cover"
                        alt={`preview-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "image")}
                        />
                      </div>
                    </div>
                  ))}
                  {videoPreviews.map((video, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <video
                        src={video}
                        className="object-fit-cover"
                        controls
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "video")}
                        />
                      </div>
                    </div>
                  ))}
                  {pdfPreviews.map((pdf, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <img
                        src={pdfIcon}
                        alt="pdf"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "pdf")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <div
                style={{ borderBottomRightRadius: "20px" }}
                className="chat-input d-flex align-items-center gap-2 position-relative"
              >
                {/* <img
                  className="cursor-pointer"
                  style={{ width: "24px", height: "24px" }}
                  src={pin}
                  alt="pin"
                  onClick={handlePinClick}
                /> */}
                {/* <input
                  id="mediaInput"
                  type="file"
                  multiple
                  accept="image/*,video/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                /> */}
                <div className="input-div d-flex align-items-center gap-3 w-100 position-relative">
                  <Input
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setShowEmojiPicker(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                  />
                  <img
                    className="cursor-pointer"
                    style={{ width: "20px", height: "20px" }}
                    src={sendMessage}
                    alt="sendMessage"
                    onClick={handleSendMessage}
                  />
                  <img
                    className="cursor-pointer"
                    style={{ width: "24px", height: "24px" }}
                    src={emojiOpener}
                    alt="emojiOpener"
                    onClick={handleEmojiOpenerClick}
                  />
                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="emoji-picker-container emoji-picker"
                    >
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal for Viewing All Images */}

              <Modal
                show={isModalVisible}
                onHide={handleModalClose}
                footer={null}
                size="lg"
                className="media-modal"
                centered
              >
                <div className="media-modal-container row p-3">
                  {modalMedia.map((media, index) => {
                    if (media.type === "image") {
                      console.log("media", media.type);
                      return (
                        <div key={index} className="p-2 col-3">
                          <img
                            src={media.src}
                            alt={`media-${index}`}
                            className="modal-media rounded-2"
                          />
                        </div>
                      );
                    }
                    if (media.type === "video") {
                      return (
                        <div key={index} className="p-2 col-3">
                          <video
                            src={media.src}
                            controls
                            className="modal-media rounded-2"
                            style={{ width: "100%" }}
                          />
                        </div>
                      );
                    }
                    if (media.type === "pdf") {
                      return media.name.map((fileName, fileIndex) => (
                        <div
                          key={`${index}-${fileIndex}`}
                          className="p-2 col-3"
                        >
                          <div className="pdf-preview-item text-center">
                            <img
                              src={pdfIcon}
                              alt={`pdf-${index}-${fileIndex}`}
                              className="modal-media rounded-2"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <p className="pdf-file-name ff-gotham-normal fs_14 mt-3 mb-0">
                              {fileName}
                            </p>
                          </div>
                        </div>
                      ));
                    }
                    return null;
                  })}
                </div>
              </Modal>
            </>
          ) : selectedGroup ? (
            <>
              <div className="chat-header d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="p-2 bg-transparent border-0 d-lg-none"
                  >
                    <FaArrowLeft fontSize={16} />
                  </button>
                  <Avatar icon={<TeamOutlined />} />
                  <div>
                    <h2
                      className="ff-gotham-bold fs_16 mb-0"
                      style={{ letterSpacing: "0.15px" }}
                    >
                      {selectedGroup.groupName}
                    </h2>

                    <div className="d-flex">
                      {selectedGroup.athletes
                        .slice(0, 5)
                        .map((member, index) => (
                          <p
                            key={member.id || index}
                            style={{
                              letterSpacing: "0.15px",
                              color: "#A0A7AF",
                            }}
                            className={`mb-0 ff-gotham-normal fs_14 ${
                              index !== 0 ? "ps-1" : "ps-0"
                            }`}
                          >
                            {member.name}
                            {index !==
                            Math.min(4, selectedGroup.athletes.length - 1)
                              ? ","
                              : ""}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
                {selectedGroup.athletes.length > 1 && (
                  <button
                    style={{ letterSpacing: "0.15px", color: "#A0A7AF" }}
                    className="mb-0 ff-gotham-normal fs_14 ps-1 color_blue ms-4 border-0 bg-transparent"
                    onClick={handleOpenModal}
                  >
                    <img
                      style={{ width: "30px" }}
                      src={infoIcon}
                      alt="infoIcon"
                    />
                  </button>
                )}
              </div>

              <div style={{ height: "50vh" }} className="chat-messages">
                {chats[selectedGroup.groupId] ? (
                  chats[selectedGroup.groupId].map((chat, index) => {
                    return (
                      <div
                        key={index}
                        className={`message p-3 ${
                          chat.sender === "You" ? "ms-auto" : "me-auto"
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between gap-4">
                          <p className="ff-gotham-bold color_blue mb-0 fs_14">
                            {chat.sender == "You" ? "You" : chat.sender}
                          </p>
                          <p
                            style={{ color: "#A0A7AF" }}
                            className="ff-gotham-normal mb-0 fs_12"
                          >
                            {chat.time}
                          </p>
                        </div>
                        <p
                          style={{ color: "#A0A7AF" }}
                          className="ff-gotham-normal mb-0 fs_12"
                        >
                          {chat.message}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex align-items-center h-100 justify-content-center">
                    <p className="mb-0 ff-gotham-bold fs_18">
                      No messages in this group yet.
                    </p>
                  </div>
                )}
              </div>

              {imagePreviews.length > 0 ||
              videoPreviews.length > 0 ||
              pdfPreviews.length > 0 ? (
                <div className="py-4 px-5 d-flex gap-3 align-items-center">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <img
                        src={image}
                        className="object-fit-cover"
                        alt={`preview-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "image")}
                        />
                      </div>
                    </div>
                  ))}
                  {videoPreviews.map((video, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <video
                        src={video}
                        className="object-fit-cover"
                        controls
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "video")}
                        />
                      </div>
                    </div>
                  ))}
                  {pdfPreviews.map((pdf, index) => (
                    <div
                      key={index}
                      className="file-preview-item position-relative"
                    >
                      <img
                        src={pdfIcon}
                        alt="pdf"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="file-preview-actions position-absolute z-3"
                        style={{ top: "-10%", right: "-4%" }}
                      >
                        <DeleteOutlined
                          style={{ color: "#5a4545" }}
                          className="action-icon"
                          onClick={() => handleFileDelete(index, "pdf")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <div
                style={{ borderBottomRightRadius: "20px" }}
                className="chat-input d-flex align-items-center gap-2 position-relative"
              >
                {/* <img
                  className="cursor-pointer"
                  style={{ width: "24px", height: "24px" }}
                  src={pin}
                  alt="pin"
                  onClick={handlePinClick}
                />
                <input
                  id="mediaInput"
                  type="file"
                  multiple
                  accept="image/*,video/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                /> */}
                <div className="input-div d-flex align-items-center gap-3 w-100 position-relative">
                  <Input
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setShowEmojiPicker(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleGroupMessage();
                    }}
                  />
                  <img
                    className="cursor-pointer"
                    style={{ width: "20px", height: "20px" }}
                    src={sendMessage}
                    alt="sendMessage"
                    onClick={handleGroupMessage}
                  />
                  <img
                    className="cursor-pointer"
                    style={{ width: "24px", height: "24px" }}
                    src={emojiOpener}
                    alt="emojiOpener"
                    onClick={handleEmojiOpenerClick}
                  />
                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="emoji-picker-container emoji-picker"
                    >
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center h-100 justify-content-center">
              <p className="mb-0 ff-gotham-bold fs_18">
                Select a contact or group to start chatting.
              </p>
            </div>
          )}
        </Content>
      </Layout>
      <ChatGroupsUsersName
        show={showModal}
        handleClose={handleCloseModal}
        athletes={selectedGroup?.athletes || []}
      />
    </div>
  );
};

export default CoachChatRoom;
