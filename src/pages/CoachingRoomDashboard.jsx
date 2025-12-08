import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Container, Col } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/fildHouseDashboard/Header";
import logo from "../assets/image/svg/logo.svg";
import dashboard_icon from "../assets/image/png/timer_icon.png";
import dashboard_icon_unselected from "../assets/image/png/dashboardunselected.png";
import calendar from "../assets/image/png/calendar.png";
import blackCalendar from "../assets/image/png/blackCalendar.png";
import BlacklibraryIcon from "../assets/image/png/BlacklibraryIcon.png";
import whiteLibraryicon from "../assets/image/png/whiteLibraryicon.png";
import journalSelected from "../assets/image/png/journalSelected.png";
import journalUnselected from "../assets/image/png/journalIcon.png";
import leaderBoard from "../assets/image/png/leaderBoard.png"
import leaderBoardSelected from "../assets/image/png/LeaderBoardSelected.png"
import chatSelected from "../assets/image/png/chaticonwhite.png";
import chatUnselected from "../assets/image/png/chaticonblack.png";
import whiteQuiteRoomIcon from "../assets/image/png/whiteQuiteRoomIcon.png";
import light from "../assets/image/png/Light.png";
import arrowRight from "../assets/image/svg/arrowRight.svg";
import logoIcon from "../assets/image/svg/logoIcon.svg";
import plusIcon from "../assets/image/png/bluePlus.png";
import whiteStadium from "../assets/image/png/whitestadium.png";
import companion from "../assets/image/png/companion.png";
import whiteCompanion from "../assets/image/png/whiteCompanion.png";
import blackStadium from "../assets/image/png/blackStadium.png";
import userGuide from "../assets/image/png/userGuide.png";
import password from "../assets/image/png/passwordIcon.png";
import support from "../assets/image/png/customer-service.png";

const { Content } = Layout;

const CoachingRoomDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({
    journal: false,
    library: false,
  });
  const [selectedItem, setSelectedItem] = useState("");
  const language = localStorage.getItem("appLanguage");
  const menuItems = [
    {
      name: "Dashboard",
      link: "dashboard",
      selectedImage: dashboard_icon,
      unselectedImage: dashboard_icon_unselected,
    },
    {
      name: "Mental Fitness Session",
      link: "session",
      selectedImage: calendar,
      unselectedImage: blackCalendar,
    },
    {
      name: "Mental Fitness Training Center",
      link: null,
      selectedImage: journalSelected,
      unselectedImage: journalUnselected,
      dropdown: [
        {
          name: "Journal",
          link: "journal/my-journal",
          selectedImage: journalSelected,
          unselectedImage: journalUnselected,
          subDropdown: [
            // {
            //   name: "My Journal",
            //   link: "",
            //   selectedImage: plusIcon,
            // },
            {
              name: "Add New",
              link: "journal/add-new",
              selectedImage: plusIcon,
            },
          ],
        },
        {
          name: "Library",
          link: "library",
          selectedImage: whiteLibraryicon,
          unselectedImage: BlacklibraryIcon,
        },
        {
          name: "Recovery Room",
          link: "recovery-room",
          selectedImage: whiteQuiteRoomIcon,
          unselectedImage: light,
        },
      ],
    },
    {
      name: "Leaderboard",
      link: "chat",
      selectedImage: leaderBoardSelected,
      unselectedImage: leaderBoard,
    },
    {
      name: "Chat",
      link: "chat",
      selectedImage: chatSelected,
      unselectedImage: chatUnselected,
    },
    {
      name: "Arena",
      link: "arena",
      selectedImage: whiteStadium,
      unselectedImage: blackStadium,
    },
    {
      name: "Coach Companion",
      link: "coach-companion",
      selectedImage: whiteCompanion,
      unselectedImage: companion,
    },
    {
      name: "Support",
      link: null,
      selectedImage: support,
      unselectedImage: support,
      dropdown: [
        {
          name: "User Guide",
          link: "user-guide",
          selectedImage: userGuide,
          unselectedImage: userGuide,
        },
        {
          name: "Update Passsword",
          link: "update-password",
          selectedImage: password,
          unselectedImage: password,
        },
      ],
    },
  ];

  const handleClick = (link, index) => {
    const itemName = menuItems[index].name.toLowerCase();

    if (menuItems[index].dropdown) {
      setDropdownVisible((prev) => ({
        ...prev,
        [itemName]: !prev[itemName],
      }));
    } else {
      navigate(link);
      setSelected(index);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.name);
        setUserInitial(parsedData.name.charAt(0));
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    const pathMatchesItem = (item, path) => {
      if (item.link && path.startsWith(`/coaching-dashboard/${item.link}`)) {
        return true;
      }
      if (item.dropdown) {
        return item.dropdown.some((dropdownItem) => {
          if (
            dropdownItem.link &&
            path.startsWith(`/coaching-dashboard/${dropdownItem.link}`)
          ) {
            return true;
          }
          if (dropdownItem.subDropdown) {
            return dropdownItem.subDropdown.some((subItem) =>
              path.startsWith(`/coaching-dashboard/${subItem.link}`)
            );
          }
          return false;
        });
      }
      return false;
    };
    const matchedIndex = menuItems.findIndex((item) =>
      pathMatchesItem(item, currentPath)
    );

    setSelected(matchedIndex !== -1 ? matchedIndex : 0);
    setDropdownVisible((prev) => {
      const visibility = { ...prev };
      menuItems.forEach((item, index) => {
        const itemName = item.name.toLowerCase();
        visibility[itemName] =
          matchedIndex === index &&
          item.dropdown &&
          pathMatchesItem(item, currentPath);
      });
      return visibility;
    });
  }, [location.pathname]);

  const toggleSidebar = () => {
    setHideSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (!token) {
      navigate("/");
    }
    try {
      const parsedData = JSON.parse(userData);
      const userRole = parsedData.role;
      console.log(userRole);
      if (userRole !== "Coach") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }, [navigate]);

  const handleuserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className={`min-vh-100`}>
      <Container fluid className="px-0 overflow-hidden">
        <Layout>
          <div
            className={`row min-vh-100 xs-margin-custom ${hideSidebar === true ? "padding-left-102" : ""
              }`}
          >
            <Col
              lg={2}
              className="border-end border-end-1 pe-0 h-100 d-lg-block mb-md-0"
            >
              <div
                style={{ height: "100vh", left: 0, top: 0 }}
                className={`card d-flex z-1  field-dashboard-sidebar ${hideSidebar === true ? "" : "col-2"
                  } justify-content-between rounded-0 position-fixed border-0 custom_space`}
              >
                <div>
                  <div className="border-bottom-1 d-flex d-lg-none justify-content-center border-bottom">
                    <img
                      onClick={() => navigate("/")}
                      width={39.6}
                      className="pt-3 pb-3"
                      style={{ cursor: "pointer" }}
                      src={logoIcon}
                      alt="logo"
                    />
                  </div>
                  <div className="border-bottom-1 d-none d-lg-flex justify-content-center border-bottom">
                    {hideSidebar === true ? (
                      <img
                        onClick={() => navigate("/")}
                        width={38.3}
                        className="pt-3 pb-3"
                        style={{ cursor: "pointer" }}
                        src={logoIcon}
                        alt="logo"
                      />
                    ) : (
                      <img
                        onClick={() => navigate("/")}
                        width={172}
                        className="pt-3 pb-3"
                        style={{ cursor: "pointer" }}
                        src={logo}
                        alt="logo"
                      />
                    )}
                  </div>
                  {/* Sidebar Menu */}
                  <div className="mt-4 dashboard-sidebar">
                    {menuItems.map((item, index) => {
                      const isActive =
                        selected === index ||
                        (item.dropdown &&
                          item.dropdown.some((dropdownItem) => {
                            if (
                              dropdownItem.link &&
                              location.pathname.startsWith(
                                `/coaching-dashboard/${dropdownItem.link}`
                              )
                            )
                              return true;
                            if (dropdownItem.subDropdown) {
                              return dropdownItem.subDropdown.some((subItem) =>
                                location.pathname.startsWith(
                                  `/coaching-dashboard/${subItem.link}`
                                )
                              );
                            }
                            return false;
                          }));

                      const imageSrc = isActive
                        ? item.selectedImage
                        : item.unselectedImage;

                      return (
                        <div
                          key={index}
                          style={{ cursor: "pointer" }}
                          className={`${isActive
                              ? "border_custom_coachingroom"
                              : "border_custom_coachingroom_unselected"
                            }`}
                          onClick={() => handleClick(item.link, index)}
                        >
                          {/* Menu Item Wrapper */}
                          <div
                            className={`py-3 d-flex align-items-center justify-content-center justify-content-lg-start position-relative gap-3 ${hideSidebar
                                ? "mx-3 px-3"
                                : "ms-lg-3 me-lg-4 ps-lg-3 mx-2"
                              } menu-item space_grotesk ${isActive
                                ? "bg_blue rounded-3 text-white"
                                : "text-black"
                              }`}
                          >
                            {item.selectedImage && item.unselectedImage && (
                              <img
                                style={{ width: "22px" }}
                                src={imageSrc}
                                alt={`${item.name} icon`}
                              />
                            )}
                            <p
                              className={`mb-0 fs_14 xs-display-none    
                                ${isActive
                                  ? `${language !== "en"
                                    ? "text-black ff-gotham-normal"
                                    : "text-white ff-gotham-bold"
                                  }`
                                  : "text-black ff-gotham-normal"
                                } ${hideSidebar ? "d-none" : "d-lg-block"}`}
                            >
                              {item.name}
                            </p>
                          </div>

                          {/* Dropdown Menu */}
                          {item.dropdown &&
                            dropdownVisible[item.name.toLowerCase()] && (
                              <div
                                className={`${hideSidebar
                                    ? "dropdown-menu-div-small"
                                    : "dropdown-menu-div pb-2 mb-4"
                                  }`}
                              >
                                {item.dropdown.map((dropdownItem, idx) => {
                                  const isDropdownActive =
                                    location.pathname.startsWith(
                                      `/coaching-dashboard/${dropdownItem.link}`
                                    ) ||
                                    (dropdownItem.subDropdown &&
                                      dropdownItem.subDropdown.some((subItem) =>
                                        location.pathname.startsWith(
                                          `/coaching-dashboard/${subItem.link}`
                                        )
                                      ));

                                  return (
                                    <div
                                      key={idx}
                                      className={`dropdown-item-wrapper ${isDropdownActive
                                          ? "bg_blue text-white py-1"
                                          : "py-1"
                                        }`}
                                    >
                                      <button
                                        className={`dropdown-item ${hideSidebar
                                            ? "px-0 justify-content-center"
                                            : "ps-lg-3 justify-content-center justify-content-lg-start"
                                          } d-flex align-items-center gap-3 fs_16 ff-gotham-normal`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(dropdownItem.link);
                                          setSelectedItem(dropdownItem.link);
                                        }}
                                      >
                                        <img
                                          className={`${hideSidebar ? "py-2" : "py-0"
                                            }`}
                                          src={dropdownItem.unselectedImage}
                                          style={{ width: "20px" }}
                                          alt="dropdown icon"
                                        />
                                        <span
                                          className={`xs-display-none fs_14 text-wrap ${hideSidebar
                                              ? "display-none"
                                              : "display-block"
                                            }`}
                                        >
                                          {dropdownItem.name}
                                        </span>
                                      </button>

                                      {/* Sub-dropdown menu */}
                                      {dropdownItem.subDropdown && (
                                        <div className="ms-lg-4 ms-3">
                                          {dropdownItem.subDropdown.map(
                                            (subItem, subIdx) => {
                                              const isSubDropdownActive =
                                                location.pathname.startsWith(
                                                  `/coaching-dashboard/${subItem.link}`
                                                );

                                              return (
                                                <button
                                                  key={subIdx}
                                                  className={`dropdown-item ${isSubDropdownActive
                                                      ? "bg_blue"
                                                      : ""
                                                    } ${hideSidebar
                                                      ? "px-0 justify-content-center"
                                                      : "ps-lg-3"
                                                    } d-flex align-items-center gap-3 pt-1`}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(subItem.link);
                                                    setSelectedItem(
                                                      subItem.link
                                                    );
                                                  }}
                                                >
                                                  <img
                                                    className={`xs-display-none ${hideSidebar
                                                        ? "py-2"
                                                        : "py-0"
                                                      }`}
                                                    style={{ width: "12px" }}
                                                    src={subItem.selectedImage}
                                                    alt="sub-dropdown icon"
                                                  />
                                                  <p
                                                    className={`xs-display-none fs_14 mb-0 ff-gotham-normal ${hideSidebar
                                                        ? "display-none"
                                                        : "display-block"
                                                      }`}
                                                  >
                                                    {subItem.name}
                                                  </p>
                                                </button>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => setShowProfileBox(!showProfileBox)}
                    className="d-flex cursor-pointer bg-transparent border-0 mx-auto position-relative align-items-center justify-content-center gap-3 py-3 "
                  >
                    <button
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "100%",
                        backgroundColor: " #00000033",
                      }}
                      className="d-flex align-items-center justify-content-center border-0"
                    >
                      <p
                        style={{ color: "#404040" }}
                        className="mb-0 ff-gotham-bold fs_18"
                      >
                        {userInitial}
                      </p>
                    </button>
                    <div
                      className={`xs-display-none ${hideSidebar === true ? "d-none" : "d-lg-flex"
                        } align-items-center gap-3`}
                    >
                      <div>
                        <p className="mb-0 ff-gotham-bold">{userName}</p>
                        <p className="mb-0 ff-gotham-normal">Coach</p>
                      </div>
                      <div>
                        <button
                          onClick={() => setShowProfileBox(!showProfileBox)}
                          className="arrow-circle bg-transparent d-flex align-items-center justify-content-center"
                        >
                          <img src={arrowRight} alt="" />
                        </button>
                      </div>
                    </div>
                    <div
                      className={`position-absolute p-3 bg-white profile-dropdown ${showProfileBox === true ? "d-block" : "d-none"
                        } ${hideSidebar === true
                          ? "profile-dropdown-2"
                          : "profile-dropdown"
                        }`}
                    >
                      <ul className="m-0 p-0">
                        <li onClick={handleuserLogout}>
                          <button className="border-0 bg-transparent ff-gotham-medium fs_14">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col
              style={{ background: "#F4F8FA", minHeight: "100vh" }}
              xs={12}
              lg={hideSidebar === true ? 12 : 10}
              className="position-relative ps-lg-0"
            >
              <div
                className={`position-sticky top-0 z_index ${hideSidebar === true ? null : "header-custom-margin"
                  }`}
              >
                <Header onToggleSidebar={toggleSidebar} />
              </div>
              <div className="ps-2">
                <Content className="ps-4 pe-4 ">
                  <Outlet />
                </Content>
              </div>
            </Col>
          </div>
        </Layout>
      </Container>
    </div>
  );
};

export default CoachingRoomDashboard;
