import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import StarRating from "./StarRating";
import {
  FaEye,
  FaDownload,
  FaArrowLeft,
  FaFilePdf,
  FaBookmark,
  FaRegBookmark,
  FaTimes,
  FaPaperPlane,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewList = ({ noteId }) => {
  const { currUser, setCurrUser, reviewList, setReviewList } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const fetchListOfReviews = async (noteId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notes/note/${noteId}/reviews`
      );
      // const reviews = response.data;
      const reviews = response.data.reviews;

      // // Sorting using the `-1` method
      // const sortedReviews = [...reviews].sort((a, b) =>
      //   new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
      // );


      const sortedReviews = [...reviews].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt) // Descending order (newest first)
      );
      setReviewList([...sortedReviews]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      // Send DELETE request to your backend
      const response = await axios.delete(
        `http://localhost:8080/api/notes/notes/${noteId}/reviews/${reviewId}`
      );

      // Optionally refresh the reviews list after deleting
      if (response) {
        toast.success("Review deleted successfully!");
        // navigate("/dashboard/view");
        fetchListOfReviews(noteId);
      }
    } catch (error) {
      toast.error("Error deleting review:", error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListOfReviews(noteId);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
      {reviewList.length ? (
        reviewList.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm md:text-base font-medium"></div>
                <div>
                  <h3 className="text-sm md:text-base font-medium text-gray-900">
                    @{review.author.username}
                  </h3>
                  <span className="hidden sm:inline text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}{" "}
                    {new Date(review.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <StarRating
                      totalStars={5}
                      initialRating={review.rating}
                      readonly={true}
                    />
                  </div>
                  <div>
                    <span className="hidden sm:inline text-base ">
                      {review.comment}
                    </span>
                  </div>
                </div>
              </div>
              {review.author._id?.toString() === currUser._id && (
                <div className="flex space-x-2">
                  {/* <button className="p-1.5 md:p-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <FaEdit className="h-4 w-4 md:h-5 md:w-5" />
                </button> */}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="p-1.5 md:p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTrash className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {review.content}
            </p>
          </div>
        ))
      ) : (
        <div className="flex  justify-center mt-2">
          <p className="lg:text-2xl text-xl text-center text-black font-semibold">
            No Reviews Yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
