import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Container, Col } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/fildHouseDashboard/Header";
import logo from "../assets/image/svg/logo.svg";
import dashboard_icon from "../assets/image/png/timer_icon.png";
import dashboard_icon_unselected from "../assets/image/png/dashboardunselected.png";
import calendar from "../assets/image/png/calendar.png";
import plusIcon from "../assets/image/png/plusIcon.png";
import blackCalendar from "../assets/image/png/blackCalendar.png";
import journalSelected from "../assets/image/png/journalSelected.png";
import journalUnselected from "../assets/image/png/journalIcon.png";
import chatSelected from "../assets/image/png/chaticonwhite.png";
import chatUnselected from "../assets/image/png/chaticonblack.png";
import companion from "../assets/image/png/companion.png";
import arrowRight from "../assets/image/svg/arrowRight.svg";
import logoIcon from "../assets/image/svg/logoIcon.svg";
import userGuide from "../assets/image/png/userGuide.png";
import password from "../assets/image/png/passwordIcon.png";
import support from "../assets/image/png/customer-service.png";

const { Content } = Layout;

const CounselorePortalDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({
    journal: false,
  });
  const language = localStorage.getItem("appLanguage");
  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      selectedImage: dashboard_icon,
      unselectedImage: dashboard_icon_unselected,
    },
    {
      name: "Counselor Availability",
      link: "/counselor-availability",
      selectedImage: calendar,
      unselectedImage: blackCalendar,
    },
    {
      name: "Calendar",
      link: "/calendar",
      selectedImage: calendar,
      unselectedImage: blackCalendar,
    },
    {
      name: "Chat",
      link: "/chat",
      selectedImage: chatSelected,
      unselectedImage: chatUnselected,
    },
    {
      name: "Journal",
      link: "/journal",
      selectedImage: journalSelected,
      unselectedImage: journalUnselected,
      dropdown: [
        { name: "Add New", link: "journal/add-new", selectedImage: plusIcon },
        {
          name: "My journal",
          link: "journal/my-journal",
          selectedImage: plusIcon,
        },
      ],
    },
    {
      name: "Arena",
      link: "/arena",
      selectedImage: chatSelected,
      unselectedImage: chatUnselected,
    },
    {
      name: "Counselor Companion",
      link: "/counselor-companion",
      selectedImage: companion,
      unselectedImage: companion,
    },
  ];

  const handleClick = (link, index) => {
    navigate(`/counselor-portal${link}`);
    setSelected(index);

    if (menuItems[index].name === "Journal") {
      setDropdownVisible((prevState) => ({
        ...prevState,
        journal: true,
      }));
    } else {
      setDropdownVisible({ journal: false });
    }
  };

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
      if (userRole !== "Counselor") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }, [navigate]);

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
    const path = location.pathname.replace("/counselor-portal", "");

    const activeTab = menuItems.findIndex(
      (item) =>
        item.link === path ||
        (item.name === "Journal" && path.startsWith("/journal")) ||
        (item.dropdown &&
          item.dropdown.some((dropdownItem) => dropdownItem.link === path))
    );

    if (activeTab !== -1) {
      setSelected((prevSelected) => {
        if (prevSelected !== activeTab) {
          if (menuItems[activeTab].name === "Journal") {
            setDropdownVisible((prevState) => ({
              ...prevState,
              journal: true,
            }));
          } else {
            setDropdownVisible((prevState) => ({
              ...prevState,
              journal: false,
            }));
          }
          return activeTab;
        }
        return prevSelected;
      });
    } else {
      setDropdownVisible((prevState) => ({ ...prevState, journal: false }));
    }
  }, [location.pathname, menuItems]);

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
            className={`row min-vh-100 xs-margin-custom ${
              hideSidebar === true ? "padding-left-102" : ""
            }`}
          >
            <Col
              lg={2}
              className="border-end border-end-1 pe-0 h-100 d-lg-block mb-md-0"
            >
              <div
                style={{ height: "100vh", left: 0, top: 0 }}
                className={`card d-flex z-1  field-dashboard-sidebar ${
                  hideSidebar === true ? "" : "col-2"
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
                                `/fieldhouse-dashboard/${dropdownItem.link}`
                              )
                            )
                              return true;
                            if (dropdownItem.subDropdown) {
                              return dropdownItem.subDropdown.some((subItem) =>
                                location.pathname.startsWith(
                                  `/fieldhouse-dashboard/${subItem.link}`
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
                          className={`${
                            isActive
                              ? "border_custom_counselor"
                              : "border_custom_counselor_unselected"
                          }`}
                          onClick={() => handleClick(item.link, index)}
                        >
                          {/* Menu Item Wrapper */}
                          <div
                            className={`py-3 d-flex align-items-center justify-content-center justify-content-lg-start position-relative gap-3 ${
                              hideSidebar
                                ? "mx-3 px-3"
                                : "ms-lg-3 me-lg-4 ps-lg-3 mx-2"
                            } menu-item space_grotesk ${
                              isActive
                                ? "bg_theme rounded-3 text-white"
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
                              className={`mb-0 fs_15 xs-display-none  
                                ${
                                  isActive
                                    ? `${
                                        language !== "en"
                                          ? "text-black ff-gotham-normal"
                                          : "text-white ff-gotham-bold"
                                      }`
                                    : "text-black ff-gotham-normal"
                                } ${hideSidebar ? "d-none" : "d-lg-block"}`}
                            >
                              {item.name}
                            </p>
                          </div>
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
                      className={`xs-display-none ${
                        hideSidebar === true ? "d-none" : "d-lg-flex"
                      } align-items-center gap-3`}
                    >
                      <div>
                        <p className="mb-0 ff-gotham-bold">{userName}</p>
                        <p className="mb-0 ff-gotham-normal">Counselor</p>
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
                      className={`position-absolute p-3 bg-white profile-dropdown ${
                        showProfileBox === true ? "d-block" : "d-none"
                      } ${
                        hideSidebar === true
                          ? "profile-dropdown-2"
                          : "profile-dropdown"
                      }`}
                    >
                      <ul className="m-0 p-0">
                        <li>
                          <button
                            onClick={handleuserLogout}
                            className="border-0 bg-transparent ff-gotham-medium fs_14"
                          >
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
                className={`position-sticky top-0 z_index ${
                  hideSidebar === true ? null : "header-custom-margin"
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

export default CounselorePortalDashboard;
