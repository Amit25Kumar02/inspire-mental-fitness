import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournalDetailsRequest } from "../../../../redux/slice/JournalDetailsSlice";
import { useParams } from "react-router-dom";

const JournalDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(
    (state) => state.journalDetails
  );

  useEffect(() => {
    dispatch(fetchJournalDetailsRequest(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details || !details.data) return <div>No journal details available</div>;

  const { title, description, images, createdAt } = details.data;

  return (
    <div className="py-4">
      {images && images.length > 0 && (
        <img
          className="rounded-3 w-100 object-fit-contain"
          style={{ height: "350px" }}
          src={images[0]}
          alt={title}
        />
      )}

      <h1 className="ff-gotham-bold fs_30 mt-4">{title}</h1>

      <p className="ff-gotham-normal fs_14">
        Published on:{" "}
        <span className="color_theme">
          {" "}
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </p>

      <div
        className="ff-gotham-normal mb-0 fs_18"
        dangerouslySetInnerHTML={{ __html: description }}
        style={{ marginTop: "20px" }}
      ></div>
    </div>
  );
};

export default JournalDetails;
