const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");


module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req, res) => {
    // if(!req.isAuthenticated()) {
    //     req.flash("error","You must login to add new lisitng");
    //     res.redirect("/listings");
    //     return res.redirect("/login");
    // };

    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","listing you are requesting for does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Enter valid data");
    // }
   
        // let{title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);

    // listingSchmea.validation(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(404,result.error);
    // }

    // if(!newListing.title){
    //     throw new ExpressError(400,"title is not found");
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400,"description is not found");
    // }
    // if(!newListing.price){
    //     throw new ExpressError(400,"price is not found");
    // }
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    // console.log(listing);
    req.flash("success","new listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you are requesting for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async (req,res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Enter valid data");
    // }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    // console.log(req.file);
}
    // let listing = await Listing.findById(id);
    // if(!listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","you dont have permission to edit");
    //     return res.redirect(`/listings/${id}`);
    // }
   
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let { id } = req.params;
    let deletedLisitng = await Listing.findByIdAndDelete(id);
    console.log(deletedLisitng);
    req.flash("success","Listing DELETED!");
    res.redirect("/listings");
};