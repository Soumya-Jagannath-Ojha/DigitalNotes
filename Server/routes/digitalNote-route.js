const express = require("express");
const noteRouter = express.Router();
const {saveRedirectUrl} = require("../middleware");
const passport = require("passport");
const Note = require("../models/listing");
const Review = require("../models/review");
const {
  fetchListOfNotes,
  handleNoteClick,
//   addNewBlog,
//   updateABlog,
//   deleteABlog,
handleSignUp,
handleSignIn,
fetchListOfReviews
} = require("../controller/note-controller");

noteRouter.get("/", fetchListOfNotes,fetchListOfReviews,handleNoteClick);
// noteRouter.post("/",fetchListOfReviews);

// noteRouter.get("/note/:id/reviews", fetchListOfReviews);
noteRouter.post("/signup",handleSignUp);
noteRouter.post("/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    // failureFlash: true,
  }),
  handleSignIn);


  noteRouter.get("/note/:id/reviews", async (req, res) => {
    // console.log(req.params.id);
    try {
      const note = await Note.findById(req.params.id).populate({
        path: "reviews",
        populate: { path: "author" }, // Populate the author's username
      });
      // const note = await Note.findById(req.params.id).populate("reviews");
  
      // console.log(note);
  
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      // console.log(note.reviews);
  
      // console.log(note);
  
      res.status(200).json({ reviews: note.reviews }); // Send the reviews of the note
    } catch (error) {
      console.error("Error fetching reviews", error);
      res.status(500).json({ message: "Error fetching reviews", error });
    }
  });

  noteRouter.delete("/notes/:noteId/reviews/:reviewId", async (req, res) => {
    const { noteId, reviewId } = req.params;
    try {
      await Note.findByIdAndUpdate(noteId, { $pull: { reviews: reviewId } });
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  noteRouter.post("/note/:id/reviews", async (req, res) => {
    const { comment, rating, author,createdAt } = req.body;
    
    if (!author) {
      return res.status(400).json({ message: "User is not logged in." });
    }
  
    try {
      // let note = await Note.findById(req.params.id);
      const note = await Note.findById(req.params.id).populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } }, // Sort by date descending (newest first)
      });

      // let newReview = new Review(req.body.)
      // console.log(comment,rating,author);
  
      let newReview = new Review({
        comment,
        rating,
        author,
        createdAt
      });
      // console.log(newReview);
  
      note.reviews.push(newReview);
      await newReview.save();
      await note.save();
      // console.log(newReview);
  
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Please add rating, Before sending the review !", error });
      // res.status(500).json({ message: "Error creating review", error });
    }
  });


module.exports = noteRouter;
