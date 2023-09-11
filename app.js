//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

const content = {
  home: {
    startingContent:
      "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.",
    posts: posts,
  },
  about: {
    aboutContent:
      "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
  },
  contact: {
    contactContent:
      "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
  },
};

app.get("/", (req, res) => {
  res.render("home.ejs",{ startingContent: content.home.startingContent, posts: posts } );
});

app.get("/about", (req, res) => {
  res.render("about.ejs",{ about: content.about.aboutContent } );
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs",{ contact: content.contact.contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

// Handle form submission to create a new post
app.post("/submit", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

// Render individual post pages
app.get("/posts/:topic", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.topic);
  const post = posts.find((p) => _.lowerCase(p.title) === requestedTitle);

  if (post) {
    res.render("post.ejs", { title: post.title, content: post.content });
  } else {
    res.status(404).send("Post not found");
  }
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
