import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import { updateNotesofAttendee } from "../../../services/CounselingAttendeesService";

export default function CounselorCalendarModal({
  isOpen = false,
  toggle,
  onSubmit,
  submitText = "Save",
  calendars = [],
  attendees = [],
  currentUser,
  schedules,
  body = "",
  zoomSessionLink,
}) {
  const [openSelectCalendars, setOpenSelectCalendars] = useState(false);
  const [openSelectAttendees, setOpenSelectAttendees] = useState(false);
  const wrapperSelectCalendarsRef = useRef(null);
  const wrapperSelectAttendeesRef = useRef(null);
  const dateRangePickerRef = useRef(null);
  const [calendarId, setCalendarId] = useState(calendars[0]?.id || "");
  const [attendeeId, setAttendeeId] = useState(attendees[0]?.id || "");
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [ticketId, setTicketId] = useState("");

  const handleClick = (e) => {
    if (wrapperSelectCalendarsRef.current?.contains(e.target)) return;
    if (wrapperSelectAttendeesRef.current?.contains(e.target)) return;
    setOpenSelectCalendars(false);
    setOpenSelectAttendees(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, []);

  function reset() {
    const today = new Date();
    setCalendarId(calendars[0]?.id || "");
    setAttendeeId(attendees[0]?.id || "");
    setTitle(currentUser?.name?.[0]);
    setNote(currentUser?.body);
    setStartDateTime(today);
    setEndDateTime(today);
    if (dateRangePickerRef.current) {
      dateRangePickerRef.current.setStartDate(
        today.toISOString().split("T")[0]
      );
    }
  }

  const resetInputs = () => {
    const today = new Date();
    setCalendarId(calendars[0]?.id || "");
    setSelectedAttendees([]);
    setTitle(currentUser?.name?.[0]);
    setNote(currentUser?.body);
    setStartDateTime(today);
    setEndDateTime(today);
    if (dateRangePickerRef.current) {
      dateRangePickerRef.current.setStartDate(
        today.toISOString().split("T")[0]
      );
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  useEffect(() => {
    setTicketId(currentUser?.id);
    setNote(currentUser?.body);
  }, [currentUser]);

  const saveNotes = async () => {
    const ticketId = currentUser?.id;
    if (ticketId) {
      await updateNotesofAttendee(ticketId, note);
    }
  };
  console.log("currentUser?.zoomSessionLink", currentUser);

  return (
    <>
      <Modal
        show={isOpen}
        onHide={() => {
          toggle();
          reset();
        }}
        centered
      >
        <div className="tui-full-calendar-popup-container rounded-2">
          {/* Title */}
          <div className="tui-full-calendar-popup-section pt-4">
            <p className="ff-gotham-medium fs_14 mb-0 ps-2 ms-1">
              Name : {currentUser?.name?.[0]}
            </p>
          </div>
          {/* STARTING TIME */}
          <div className="tui-full-calendar-popup-section d-flex align-items-center">
            <p className="ff-gotham-medium fs_14 mb-0 ps-2 ms-1">
              Session Starting:
            </p>
            <p className="ff-gotham-light fs_14 mb-0 ms-1">
              {currentUser?.start
                ? new Date(currentUser.start) > new Date()
                  ? new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "long",
                      weekday: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(currentUser.start))
                  : "The session has already ended."
                : "No Start Date"}
            </p>
          </div>

          {/* ZOOM LINK */}
          <div className="d-flex align-items-center gap-2 ps-2 ms-1">
            <p className="ff-gotham-medium fs_14 mb-0">Session url :</p>
            {currentUser?.zoomSessionLink ? (
              <a
                target="_blank"
                className="ff-gotham-light fs_14"
                href={`${currentUser?.zoomSessionLink}`}
              >
                {currentUser?.zoomSessionLink}
              </a>
            ) : (
              <p className="ff-gotham-light fs_14 mb-0">No session url found</p>
            )}
          </div>
          {/* Note */}
          <div className="tui-full-calendar-popup-section mt-4">
            <ReactQuill
              key={note ? "loaded" : "initial"}
              id="note"
              className="form-control  border-0"
              placeholder="Counseling Notes"
              value={note}
              onChange={setNote}
              modules={modules}
              theme="snow"
            />
          </div>
          {/* Buttons */}
          <div className="tui-full-calendar-popup-footer mt-4 d-flex align-items-center justify-content-end gap-2">
            <button
              style={{ height: "42px" }}
              className="bg_theme border-0 px-4 rounded-2 text-white"
              onClick={() => {
                onSubmit({
                  calendarId,
                  title,
                  body: note,
                  start: startDateTime.toISOString(),
                  end: endDateTime.toISOString(),
                });
                toggle();
                resetInputs();
                saveNotes();
              }}
            >
              Save Notes
            </button>
            <button
              style={{ background: "#0071BD", height: "42px" }}
              className="border-0 px-4 rounded-2 text-white"
              onClick={() => {
                toggle();
                resetInputs();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
