var express=require("express");
var app=express();

var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));

var mongoose=require("mongoose");
var Campground= require("./models/campground");
var seedDB= require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelpcamp",{useNewUrlParser: true});
seedDB();

app.set("view engine", "ejs");

//SCHEMA SETUP
//var campgroundSchema = new mongoose.Schema({
	//name: String,
	//image:String,
	//description:String
//});
// var Campground = mongoose.model("Campground",campgroundSchema);

app.get("/",function(req,res){
	res.render("landing");
});
app.get("/campgrounds",function(req,res){
      Campground.find({},function(err,allCampgrounds){
		  if(err){
			  console.log(err);
		  }
		  else{  
	res.render("campgrounds/index", {campgrounds:allCampgrounds});
		  }
		});
});
app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	//redirect back to campgrounds page(thats why the url in both routes is same)
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var newCampground={name:name, image:image, description:description};
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	
});
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});
app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID(with a fn. given by mongoose)
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{ 
			console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
	
});

// COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campgrounds by id
	Campground.findById(req.params.id, function(err, campground){
     if(err){
		 console.log(err);
	 } else{
		 res.render("comments/new", {campground: campground});
	 }
	});
	
});

app.post("/campgrounds/:id/comments", function(req,res){
	//lookup campground using ID
	Campgroound.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
         console.log(req.body.comment);
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect campground show page


})
app.listen(3000,function(){
	console.log("yelp camp started");
});