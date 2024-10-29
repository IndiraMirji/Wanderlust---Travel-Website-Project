const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController =  require("../controllers/listings.js");
const multer =  require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



// const validateListing = (req,res,next) =>{
//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(404,errMsg);
//     } else {
//         next();
//     }
// }


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,
wrapAsync(listingController.createListing));


// New Route                        writing it upside show route because it is confusing with show routes id
router.get("/new",isLoggedIn,listingController.renderNewForm);
    // wrapAsync((req, res) => {
    // if(!req.isAuthenticated()) {
    //     req.flash("error","You must login to add new lisitng");
    //     res.redirect("/listings");
    //     return res.redirect("/login");
    // };

    // res.render("listings/new.ejs");
// }


router.route("/:id")
.get(isLoggedIn,wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),
wrapAsync(listingController.renderEditForm));


//Index Route
// router.get("/",wrapAsync(listingController.index));



//Show Route
// router.get("/:id",isLoggedIn,wrapAsync(listingController.showListing));

//Create Route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));



//Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;