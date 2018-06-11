const express = require('express')
const path = require('path')
const compress = require('compression')
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const app = express();
const note = require('./db');
app.use(compress());

// prod options

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/'. function(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

// ------------------------------------
// DB
// ------------------------------------
  mongoose.connect('mongodb://localhost:27017/test');

  //creating model 
  app.use( bodyParser.json() );

  require('./db.js').makedb(mongoose);

  const Note = mongoose.model('Note');
  const Amount = mongoose.model('Amount');


if ('' == '') {

  // add methods for the Notes page

  let dataNote = (findOptions) => { 
    return Note.find(findOptions);
  };

  let delNote = (id) => { 
    return Note.findById(id).remove();
  };

  let numberForEmptyData = () => {
    return Amount.find();
  };

  let clearAmount = () => {
    return Amount.remove({});
  }
 


  app.get('/postsData', function (req, res, next) {
    dataNote({ isThread: true }).then(data => res.send(data));
  });


  // add new post and set number and date

  app.post('/postsData', function(req, res, next) {
    // case if add new post
    // check amount of posts 
    numberForEmptyData().then(data => {
        if (!data) {
          const amount = new Amount({
            amount: 1,
          });
          return 1;
        }
        const saveAmount = data[data.length - 1].amount + 1 
        const amount = new Amount({
          amount: saveAmount,
        }); 
        clearAmount().then(() => amount.save());
        return saveAmount;
      }).then((saveAmount) => {

         // set date
         const dateNow = new Date();
         const dateNowString = dateNow.toLocaleString();
         // create new post
         // if it is new thread make a new post
          if (req.body.isThread === true) {
           const note = new Note({
                name: req.body.name,
                text: req.body.text,
                date: dateNowString,
                dateMs: Date.now(), 
                number: saveAmount,
                rate: 0,
                isThread: req.body.isThread,
                threadPosts: []
            });

            note.save().then( () => dataNote({ isThread: true }) )
              .then(data => { 
                if (data.length > 10) { // removing last thread
                    Note.find({}).then(rdata => { //find oldest note
                        const dateNow = Date.now()
                        rdata.sort(function(a, b) {
                            if ((b.threadPosts.length > 0) && (a.threadPosts.length > 0)) {
                              return a.threadPosts[a.threadPosts.length - 1].dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs
                            }
                            if ((b.threadPosts.length == 0) && (a.threadPosts.length > 0)) {
                              return a.threadPosts[a.threadPosts.length - 1].dateMs - b.dateMs
                            }
                            if ((b.threadPosts.length > 0) && (a.threadPosts.length == 0)) {
                              return a.dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs
                            }
                            if ((b.threadPosts.length == 0) && (a.threadPosts.length == 0)) {
                              return a.dateMs - b.dateMs;
                            }
                        });
                        let oldestNoteId = rdata[0]._id // id of the oldest thread
                        delNote(oldestNoteId).then( () => dataNote({ isThread: true }) ).then(data => res.send(data));
                    });
                } else {
                  res.send(data);
                }
              })
              // .then(data => res.send(data));
          }

        // if post is not new thread, search "thread post" and add answer to them
          if (!req.body.isThread) {
                Note.findOne({ number: req.body.threadNumber }).then((data) => {
                  if (data.threadPosts.length <= 19) {  
                      data.threadPosts.push({
                        name: req.body.name,
                        text: req.body.text,
                        date: dateNowString,
                        dateMs: Date.now(), 
                        number: saveAmount,
                        rate: 0,
                        isThread: req.body.isThread,               
                      });
                      data.save().then( () => dataNote({ isThread: true }) ).then(data => res.send(data));
                      return data;
                  } else {
                        console.log('bump-limit');
                        res.send(data);
                  }
                });
          }
        });
    });

  app.delete('/postsData/:id', function (req, res, next) {
    // console.log(req.params);
    delNote(req.params.id).then( () => dataNote({ isThread: true }) ).then(data => res.send(data));
  });


}

module.exports = app
