const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("review was added");
    // res.send("review was added");
    req.flash("success","New REVIEW created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","You deleted a review");
    res.redirect(`/listings/${id}`);
};