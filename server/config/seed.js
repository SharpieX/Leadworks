/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Book = require('../api/book/book.model');

Book.find({}).remove(function () {
  Book.create(
    {
      title: 'Unlocking Android',
      description: 'Unlocking Android: A Developer\'s Guide provides concise, hands-on instruction for the Android operating system and development tools',
      author: 'W. Frank Ableson',
      isbn: "ISBN:1933988673",
      publishedDate: {"$date": "2009-04-01T00:00:00.000-0700"},
      genre: 'education'
    },
    {
      title : 'MongoDB in Action',
      description : 'MongoDB In Action is a comprehensive guide to MongoDB for application developers. The book begins by explaining what makes MongoDB unique and describing its ideal use cases.',
      author:'Kyle Banker',
      isbn : "ISBN:1935182870",
      genre: 'education'
    },
    {
      title : 'AngularJS in Action',
      description : 'The book begins by explaining what makes angular unique',
      author:'Lukas Ruebbelke',
      isbn : "ISBN:1617291331",
    },
    {
      title : 'CORS in Action',
      description : 'read more about how cross origin request works in browser',
      author:'John Griffin',
      isbn : "ISBN:1617291821",
      genre: 'education',
    },
    {
      title : 'IntelliJ IDEA in Action',
      description : 'The purpose of this most excellent book is to get you up and running quickly. Perhaps more importantly, this book shows you how to use IDEA\'s multitude of powerful software development tools to their fullest advantage!',
      author:'John R. Vacca',
      isbn : "ISBN:1932394443",
      genre: 'education',
    },
    {
      title : 'Ruby for Rails',
      description : 'The word is out: with Ruby on Rails you can build powerful Web applications easily and quickly! And just like the Rails framework itself, Rails applications are Ruby programs.',
      author:'W. Frank Ableson',
      isbn : "ISBN:1932394699",
      genre: 'education',
    },
    function (err) {
      console.log('finished populating Books');
    });
});

User.find({}).remove(function () {
  User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function () {
      console.log('finished populating users');
    }
  );
});
