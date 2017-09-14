const path = require('path')
var mongoose = require('mongoose')

const MessageStatus = mongoose.model('MessageStatus')
const Counter = mongoose.model('Counter')
const fs = require('fs')

const getHeartCheck = (req, res) => {
  fs.readFile(path.join(__dirname, '../../public/images/heart.png'), function read(err, data) {
    if (err) { throw err }
    else {
      var typeOfMsg = req.params.type

      MessageStatus.findOne({user_id: req.params.id}, (err, user) => {
        if (err)
          throw new Error("cannot find user")

        if(user){
          Counter.findOne({}, (err, counter) => {
            if(err)
              throw new Error("cannot find counter")

            if(typeOfMsg == 'register' && !user.opened_register_msg){
              user.opened_register_msg = true
              counter.opened_register_msg = counter.opened_register_msg ? counter.opened_register_msg + 1 : 1
            } else if(typeOfMsg == 'forgot' && !user.opened_forgot_msg){
              user.opened_forgot_msg = true
              counter.opened_forgot_msg = counter.opened_forgot_msg ? counter.opened_forgot_msg + 1 : 1
            } else if(typeOfMsg == 'remind' && !user.opened_remind_msg){
              user.opened_remind_msg = true
              counter.opened_remind_msg = counter.opened_remind_msg ? counter.opened_remind_msg + 1 : 1
            } else if(typeOfMsg == 'success' && !user.opened_success_msg){
              user.opened_success_msg = true
              counter.opened_success_msg = counter.opened_success_msg ? counter.opened_success_msg + 1 : 1
            } else if(typeOfMsg == 'firstletter' && !user.opened_firstletter_msg){
              user.opened_firstletter_msg = true
              counter.opened_firstletter_msg = counter.opened_firstletter_msg ? counter.opened_firstletter_msg + 1 : 1
            } else if(typeOfMsg == 'secondletter' && !user.opened_secondletter_msg){
              user.opened_secondletter_msg = true
              counter.opened_secondletter_msg = counter.opened_secondletter_msg ? counter.opened_secondletter_msg + 1 : 1
            } else if(typeOfMsg == 'thirdletter' && !user.opened_thirdletter_msg){
              user.opened_thirdletter_msg = true
              counter.opened_thirdletter_msg = counter.opened_thirdletter_msg ? counter.opened_thirdletter_msg + 1 : 1
            } else if(typeOfMsg == 'fourthletter' && !user.opened_fourthletter_msg){
              user.opened_fourthletter_msg = true
              counter.opened_fourthletter_msg = counter.opened_fourthletter_msg ? counter.opened_fourthletter_msg + 1 : 1
            } else if(typeOfMsg == 'fifthletter' && !user.opened_fifthletter_msg){
              user.opened_fifthletter_msg = true
              counter.opened_fifthletter_msg = counter.opened_fifthletter_msg ? counter.opened_fifthletter_msg + 1 : 1
            } else if(typeOfMsg == 'lastactive' && !user.opened_lastactive_msg){
              user.opened_lastactive_msg = true
              counter.opened_lastactive_msg = counter.opened_lastactive_msg ? counter.opened_lastactive_msg + 1 : 1
            }
            
            user.save(err => {
                if (err)
                  throw new Error("cannot save user")

                counter.save(err => {
                  if (err)
                    throw new Error("cannot save counter")

                  res.writeHead('200', {'Content-Type': 'image/png'});
                  res.end(data,'binary');
                })
            })
          })
        } else {
          res.writeHead('200', {'Content-Type': 'image/png'});
          res.end(data,'binary');
        }
      })
    }
  })
}

const getHeart = (req, res) => {
  fs.readFile(path.join(__dirname, '../../public/images/heart.png'), function read(err, data) {
    if (err) { throw err }
    else {
      res.writeHead('200', {'Content-Type': 'image/png'});
      res.end(data,'binary');
    }
  })
}

const getFacebook = (req, res) => {
  fs.readFile(path.join(__dirname, '../../public/images/facebook.png'), function read(err, data) {
    if (err) { throw err }
    else {
      res.writeHead('200', {'Content-Type': 'image/png'});
      res.end(data,'binary');
    }
  })
}

const getInstagram = (req, res) => {
  fs.readFile(path.join(__dirname, '../../public/images/instagram.png'), function read(err, data) {
    if (err) { throw err }
    else {
      res.writeHead('200', {'Content-Type': 'image/png'});
      res.end(data,'binary');
    }
  })
}

const getMedium = (req, res) => {
  fs.readFile(path.join(__dirname, '../../public/images/medium.png'), function read(err, data) {
    if (err) { throw err }
    else {
      res.writeHead('200', {'Content-Type': 'image/png'});
      res.end(data,'binary');
    }
  })
}

 module.exports = {
   getHeartCheck,
   getHeart,
   getFacebook,
   getInstagram,
   getMedium
 }
