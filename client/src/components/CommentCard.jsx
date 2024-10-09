import React from "react";
import { Link } from "react-router-dom";

export default function CommentCard({ createdAt, content, author, _id }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  return (
    <div className="p-3 flex gap-3" key={_id}>
      <div>
        <img src={author.avatar} className="rounded-full w-11" alt="" />
      </div>
      <div className="border py-5 px-3 rounded-md w-full flex flex-col gap-3">
        <p>
          <Link
            to={`/u/${author.username}`}
            className="font-semibold hover:bg-gray-200 transition-all duration-200 inline p-2 rounded-md text-lg"
          >
            @{author.username}
          </Link>
          <span>{formatDate(createdAt)}</span>
        </p>
        <p className="p-2 text-xl font-normal">{content}</p>
      </div>
    </div>
  );
}
