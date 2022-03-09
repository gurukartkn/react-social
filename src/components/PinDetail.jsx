import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();
  const navigate = useNavigate();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          window.location.reload(false);
          setAddingComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner />;

  return (
    <>
      <div className="flex xl:flex-row flex-col m-auto bg-sky-50 dark:bg-slate-800 rounded-md">
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="post"
            className="rounded-md"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="bg-sky-100 dark:bg-slate-400 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="bg-sky-100 dark:bg-slate-400 flex items-center fap-2 text-black font-bold p-2 rounded-full opacity-70 hover:opacity-100 shadow-md"
            >
              <BsFillArrowUpRightCircleFill />
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3 text-sky-900 dark:text-slate-50">
              {pinDetail.title}
            </h1>
            <p className="mt-3 text-sky-700 dark:text-slate-300">
              {pinDetail.about}
            </p>
          </div>
          <Link
            to={`/user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 mt-2 items-center"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={pinDetail.postedBy?.image}
              alt="userprof"
            />

            <p className=" text-sky-900 dark:text-slate-50 font-semibold capitalize">
              {pinDetail.postedBy?.username}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl text-sky-900 dark:text-slate-50">
            Comments
          </h2>
          <div className="max-h-30 overflow-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className="flex gap-2 mt-5 items-center bg-sky-50 dark:bg-slate-800 rounded-lg"
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-sky-900 dark:text-slate-50">
                    {comment.postedBy.username}
                  </p>
                  <p className="text-sky-700 dark:text-slate-300">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
              <img
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                src={pinDetail.postedBy?.image}
                alt="userprof"
              />
            </Link>
            <input
              type="text"
              className="flex-1 border-sky-100 dark:border-slate-300 dark:text-slate-900 dark:bg-slate-300 outline-none border-2 p-2 rounded-xl focus:border-sky-200 dark:focus:border-slate-200 shadow-lg"
              placeholder="Add a Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 dark:bg-slate-600 dark:text-slate-50 text-white rounded-full px-6 py-2 font-semibold text-base outline-none shadow-lg"
              onClick={addComment}
            >
              {addingComment ? "Posting the Comment.." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4 dark:text-slate-50">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PinDetail;
