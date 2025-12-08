import React, { useEffect, useState, useRef } from "react";
import { Layout, Input, Avatar, List } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { io } from "socket.io-client";
import pin from "../../../assets/image/svg/sharePin.svg";
import sendMessage from "../../../assets/image/svg/sendMessage.svg";
import emojiOpener from "../../../assets/image/svg/emojiOpener.svg";
import pdfIcon from "../../../assets/image/png/coachroompdficon.png";
import Picker from "emoji-picker-react";
import "./CounselorChat.css";
import { Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const { Sider, Content } = Layout;
const MAX_PREVIEW_IMAGES = 4;

const CounselorChat = () => {
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
  const API_URL = process.env.REACT_APP_API_URL;

  // Ref for emoji picker
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/counseling/completed-athletes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: ` ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);

        if (data?.data?.success === true) {
          console.log("contact", data?.data?.success);
          const contacts = data?.data.contacts.map((contact) => {
            const fullName = contact?.name;
            const messageContent = contact.lastMessage
              ? contact.lastMessage.content
              : "No messages yet";

            const messageTime = contact.lastMessage
              ? new Date(contact.lastMessage.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return {
              name: fullName,
              time: messageTime,
              message: messageContent,
              id: contact.id,
            };
          });

          setContacts(contacts);
        }
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

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

  // Pin click handler
  const handlePinClick = () => {
    document.getElementById("mediaInput").click();
  };

  useEffect(() => {
    const socketInstance = io(API_URL, {
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      socketInstance.emit("join_chat", {
        token: localStorage.getItem("token"),
      }); // Join chat room
    });

    socketInstance.on("receive_message", (data) => {
      console.log("Received message:", data); // Log the received message
      const { sender, content, timestamp } = data;

      // Update chat state to reflect the new message
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

      // Update contacts list with latest message and time
      setContacts((prevContacts) =>
        prevContacts.map((contact) => {
          console.log("contactcontact", contact);
          if (contact.id === sender) {
            console.log("Updating contact ID:", contact.id); // Log the contact ID being updated
            return {
              ...contact,
              message: content,
              time: new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return contact; // Return unchanged contact
        })
      );
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); // Clean up on unmount
    };
  }, []);

  // Emit join chat event for selected user when the user changes
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
        // Format messages for chat display
        const formattedMessages = data.messages.map((msg) => ({
          message: msg.content,
          sender: msg.sender === contactId ? "other" : "me",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        // Update chat history
        setChats((prevChats) => ({
          ...prevChats,
          [contactId]: formattedMessages,
        }));

        // Extract the latest message and update contacts
        const latestMessage = data.messages[data.messages.length - 1];
        if (latestMessage) {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact._id === contactId
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

  // Sending a message
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

      // Optimistically add sent message to chat
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

      // Clear input fields
      setMessage("");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedUser(contact);
    fetchMessages(contact.id);
  };

  // Search change handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Key press handler
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Modal close handler
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Fetch user name from local storage
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

  // Handle clicks outside emoji picker
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

  return (
    <div className="py-4">
      <h4 className="ff-gotham-bold fs_25 mb-3">Recent chats</h4>
      <Layout className="chat-layout">
        <Sider
          className={`chat-sider ${
            selectedUser ? "d-none d-lg-block" : "d-block"
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
          <List
            style={{ height: "65vh" }}
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
        </Sider>
        <Content
          className={`chat-content  ${
            selectedUser ? "d-block" : "d-none d-lg-block"
          }`}
        >
          {selectedUser ? (
            <>
              <div className="chat-header d-flex align-items-center gap-2">
                <button
                  className="p-2 bg-transparent border-0 d-lg-none"
                  onClick={() => setSelectedUser(null)}
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
                    console.log("selectedUser", selectedUser);
                    return (
                      <div
                        key={index}
                        className={`message p-3 ${
                          chat.sender === "other" ? "me-auto" : "ms-auto"
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between gap-4">
                          <p className="ff-gotham-bold color_theme mb-0 fs_14">
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
                <img
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
                />
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
          ) : (
            <div className="d-flex align-items-center h-100 justify-content-center">
              <p className="mb-0 ff-gotham-bold fs_18">
                Select a contact to start chatting.
              </p>
            </div>
          )}
        </Content>
      </Layout>
    </div>
  );
};

export default CounselorChat;
