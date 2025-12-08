import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CounselorCalendar from "./CounselorCalendar";
import CounselorCalendarModal from "./CounselorCalendarModal";
import attendeeImage from "../../../assets/image/png/Avatar.png";
import {
  counselingAttendeesList,
  getNotesofAttendee,
} from "../../../services/CounselingAttendeesService";

let schedules = [];

const attendees = [];

const colors = [
  {
    color: "#4D5E80",
    bgColor: "#FF66330D",
    dragBgColor: "#FF6633",
    borderColor: "#FF6633",
  },
  {
    color: "#4D5E80",
    bgColor: "#29CC390D",
    dragBgColor: "#29CC39",
    borderColor: "#29CC39",
  },
  {
    color: "#4D5E80",
    bgColor: "#8833FF0D",
    dragBgColor: "#8833FF",
    borderColor: "#8833FF",
  },
  {
    color: "#4D5E80",
    bgColor: "#33BFFF0D",
    dragBgColor: "#33BFFF",
    borderColor: "#33BFFF",
  },
  {
    color: "#4D5E80",
    bgColor: "#FFCB330D",
    dragBgColor: "#FFCB33",
    borderColor: "#FFCB33",
  },
  {
    color: "#4D5E80",
    bgColor: "#E62E7B0D",
    dragBgColor: "#E62E7B",
    borderColor: "#E62E7B",
  },
  {
    color: "#4D5E80",
    bgColor: "#2EE6CA0D",
    dragBgColor: "#2EE6CA",
    borderColor: "#2EE6CA",
  },
];

const attendeesList = async () => {
  const response = await counselingAttendeesList();

  if (response?.data) {
    schedules = response.data.map((item) => {
      const counselingDate = new Date(item.date);

      const start = new Date(
        counselingDate.setHours(
          item.time.split(":")[0],
          item.time.split(":")[1]
        )
      );

      const end = new Date(start);
      end.setHours(start.getHours() + 1);

      const zoomSessionLink = item.zoomLink || "No Zoom Link Available";

      console.log("Zoom Session Link for attendee:", zoomSessionLink);

      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: item._id,
        title: `${item.athleteId?.firstName} ${item.athleteId?.lastName}`,
        calendarId: "1",
        category: "time",
        attendeeImage: attendeeImage,
        attendees: [`${item.athleteId?.firstName} ${item.athleteId?.lastName}`],
        isVisible: true,
        notes: item?.notes,
        start: start.toISOString(),
        end: end.toISOString(),
        color: randomColor.color,
        bgColor: randomColor.bgColor,
        borderColor: randomColor.borderColor,
        dragBgColor: randomColor.dragBgColor,
        body: item?.notes,
        customStyle: item?.zoomLink || false,
      };
    });
  }
};

const Counsel = () => {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSchedulesLoaded, setIsSchedulesLoaded] = useState(false);
  const [athleteNotes, setAthleteNotes] = useState("");
  const childRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await attendeesList();
      setIsSchedulesLoaded(true);
    };
    fetchData();
  }, []);

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    event.guide.clearGuideElement();
    setEvent(event);
  }

  const calendars = [];

  async function onBeforeUpdateSchedule(event) {
    const { schedule } = event;

    console.log("event", event);

    console.log("Schedule received in onBeforeUpdateSchedule:", schedule);

    const response = await getNotesofAttendee(schedule?.id);
    setAthleteNotes(response);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setCurrentUser({
      id: schedule?.id,
      name: schedule?.attendees,
      body: response,
      color: randomColor.color,
      bgColor: randomColor.bgColor,
      borderColor: randomColor.borderColor,
      dragBgColor: randomColor.dragBgColor,
      start: schedule?.start?._date,
      zoomSessionLink: schedule.customStyle,
    });

    setModal(true);
    setEvent({
      ...event,
      zoomSessionLink: schedule?.customStyle || "No Zoom Link Available",
      color: randomColor.color,
      bgColor: randomColor.bgColor,
      borderColor: randomColor.borderColor,
      dragBgColor: randomColor.dragBgColor,
    });
  }

  async function handleUpdateSchedule(updateEvent) {
    const result = true;

    if (result) {
      const { schedule } = event;

      console.log("schedule update", schedule);

      await childRef.current.deleteSchedule(schedule);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newSchedule = {
        ...schedule,
        id: currentUser?.id,
        body: athleteNotes,
        title: currentUser?.name?.[0],
        calendarId: updateEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: updateEvent.attendees,
        isVisible: true,
        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: updateEvent.location,
        state: updateEvent.state,
        body: currentUser?.body,
        color: randomColor.color,
        bgColor: randomColor.bgColor,
        borderColor: randomColor.borderColor,
        dragBgColor: randomColor.dragBgColor,
        zoomSessionLink: currentUser?.zoomSessionLink,
      };

      await childRef.current.createSchedule(newSchedule);
      setModal(false);
    }
  }

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <div>
      {isSchedulesLoaded && (
        <CounselorCalendar
          ref={childRef}
          {...{
            isReadOnly: false,
            showSlidebar: true,
            showMenu: true,
            useCreationPopup: false,
            calendars: formatCalendars,
            schedules,
            currentUser,
            onBeforeCreateSchedule,
            onBeforeUpdateSchedule,
            onBeforeDeleteSchedule: () => {},
          }}
        />
      )}
      <CounselorCalendarModal
        isOpen={modal}
        currentUser={currentUser}
        toggle={toggle}
        onSubmit={handleUpdateSchedule}
        submitText={event?.triggerEventName === "mouseup" ? "Save" : "Update"}
        calendars={formatCalendars}
        attendees={attendees}
        schedule={event?.schedule}
        startDate={event?.start}
        endDate={event?.end}
        body={event?.schedule?.body}
        schedules={schedules}
        zoomSessionLink={event?.zoomSessionLink}
      />
    </div>
  );
};

export default Counsel;
