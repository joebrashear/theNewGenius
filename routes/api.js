const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');

// hardcoded password
router.get("/login", (req, res) => {
    const user = {
      loginName: "admin",
      loginPassword: "password",
    };
    console.log("Data: ", user);
    res.json(user);
  });

// Routes
router.get('/', (req, res) => {

    BlogPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post("/api/login", async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
  
    const { login, password } = req.body;
  
    const db = client.db();
    const results = await db
      .collection("Users")
      .find({ Login: login, Password: password })
      .toArray();
  
    var id = -1;
    var fn = "";
    var ln = "";
  
    if (results.length > 0) {
      // login=='RickL' && password=='COP4331')
      id = results[0].UserId;
      fn = results[0].FirstName; // 'Rick';
      ln = results[0].LastName; // 'Leinecker';
    }
  
    var ret = { id: id, firstName: fn, lastName: ln, error: "" };
    res.status(200).json(ret);
  });

router.post('/save', (req, res) => {
        const data = req.body;

        const newBlogPost = new BlogPost(data);
        // .save

        newBlogPost.save((error) => {
            if (error){
                res.status(500).json({ msg: 'Sorry, internal server errors'});
                return;
            }
            return res.json({
                msg: 'Your data has been saved!!!'
            });
        });
        
});

module.exports = router;

