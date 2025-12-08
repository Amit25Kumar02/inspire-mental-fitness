// import React, {
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
// } from "react";

// const CalendarDatePicker = forwardRef(
//   ({ start, end, style, onChange }, ref) => {
//     const inputRef = useRef(null);
//     const formatDate = (date) => {
//       const d = new Date(date);
//       return d.toISOString().split("T")[0];
//     };

//     const todayDate = formatDate(new Date());

//     const [startDate, setStartDate] = useState(
//       start ? formatDate(start) : todayDate
//     );
//     const [endDate, setEndDate] = useState(end ? formatDate(end) : todayDate);
//     const [error, setError] = useState("");

//     useImperativeHandle(ref, () => ({
//       setStartDate(date) {
//         const formattedDate = formatDate(date);
//         console.log("ImperativeHandle - Set Start Date:", formattedDate);
//         setStartDate(formattedDate);
//         setEndDate(formattedDate);
//         if (typeof onChange === "function") {
//           onChange([formattedDate, formattedDate]);
//         }
//       },
//       setEndDate(date) {
//         const formattedDate = formatDate(date);
//         console.log("ImperativeHandle - Set End Date:", formattedDate);
//         setEndDate(formattedDate);
//       },
//     }));

//     const handleStartDateChange = (e) => {
//       const newStartDate = e.target.value;
//       const newStartDateObj = new Date(newStartDate);

//       console.log("Selected Start Date:", newStartDate);
//       console.log("Current End Date:", endDate);

//       if (
//         /^\d{4}-\d{2}-\d{2}$/.test(newStartDate) &&
//         newStartDate >= todayDate
//       ) {
//         setStartDate(newStartDate);
//         setEndDate(newStartDate);

//         console.log("Updated End Date:", newStartDate);
//         setError("");
//         if (typeof onChange === "function") {
//           onChange([newStartDate, newStartDate]);
//         }
//       } else {
//         setError("Start date cannot be earlier than today.");
//         console.error("Start date cannot be earlier than today:", newStartDate);
//       }
//     };

//     const handleDivClick = () => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     };

//     return (
//       <div style={style}>
//         <div className="tui-full-calendar-popup-section">
//           <div
//             onClick={handleDivClick}
//             style={{ width: 224.5 }}
//             className="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date"
//           >
//             <input
//               className="tui-full-calendar-content"
//               placeholder="Start date"
//               type="date"
//               ref={inputRef}
//               value={startDate}
//               min={todayDate}
//               onChange={handleStartDateChange}
//             />
//           </div>
//         </div>
//         {error && <div className="error-message">{error}</div>}{" "}
//       </div>
//     );
//   }
// );

// export default CalendarDatePicker;

import { DatePicker } from "antd";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

const CalendarDatePicker = forwardRef(
  ({ start, end, style, onChange }, ref) => {
    const inputRef = useRef(null);
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    };

    const todayDate = formatDate(new Date());

    const [startDate, setStartDate] = useState(
      start ? formatDate(start) : todayDate
    );
    const [endDate, setEndDate] = useState(end ? formatDate(end) : todayDate);
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      setStartDate(date) {
        const formattedDate = formatDate(date);
        console.log("ImperativeHandle - Set Start Date:", formattedDate);
        setStartDate(formattedDate);
        setEndDate(formattedDate);
        if (typeof onChange === "function") {
          onChange([formattedDate, formattedDate]);
        }
      },
      setEndDate(date) {
        const formattedDate = formatDate(date);
        console.log("ImperativeHandle - Set End Date:", formattedDate);
        setEndDate(formattedDate);
      },
    }));

    const handleStartDateChange = (e) => {
      const newStartDate = e.target.value;
      const newStartDateObj = new Date(newStartDate);

      console.log("Selected Start Date:", newStartDate);
      console.log("Current End Date:", endDate);

      if (
        /^\d{4}-\d{2}-\d{2}$/.test(newStartDate) &&
        newStartDate >= todayDate
      ) {
        setStartDate(newStartDate);
        setEndDate(newStartDate);

        console.log("Updated End Date:", newStartDate);
        setError("");
        if (typeof onChange === "function") {
          onChange([newStartDate, newStartDate]);
        }
      } else {
        setError("Start date cannot be earlier than today.");
        console.error("Start date cannot be earlier than today:", newStartDate);
      }
    };

    const handleDivClick = () => {
      if (inputRef.current) {
        inputRef.current.focus(); // This will trigger the datepicker
      }
    };

    return (
      <div style={style}>
        <div className="tui-full-calendar-popup-section">
          <div
            onClick={handleDivClick}
            style={{ width: 224.5, cursor: "pointer" }} // added cursor for visual feedback
            className="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date"
          >
            <input
              className="tui-full-calendar-content"
              placeholder="Start date"
              type="date"
              ref={inputRef}
              value={startDate}
              min={todayDate}
              onClick={handleDivClick}
              onChange={handleStartDateChange}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }
);

export default CalendarDatePicker;
