var Book = require('./book.model');


exports.index = function (req, res) {
  Book.find(function (err, books) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(books);
  });
};

// Handle book create on POST
exports.create = function (req, res, next) {
  req.checkBody('title', 'Title must not be empty.').notEmpty();
  req.checkBody('author', 'Author must not be empty').notEmpty();
  req.checkBody('description', 'Summary must not be empty').notEmpty();
  req.checkBody('isbn', 'ISBN must not be empty').notEmpty();

  req.sanitize('title').escape();
  req.sanitize('author').escape();
  req.sanitize('description').escape();
  req.sanitize('isbn').escape();
  req.sanitize('title').trim();
  req.sanitize('author').trim();
  req.sanitize('description').trim();
  req.sanitize('isbn').trim();
  req.sanitize('genre').escape();

  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn,
    genre: req.body.genre
  });

  console.log('BOOK: ' + book);

  var errors = req.validationErrors();
  if (errors) {
    handleError(res, errors);

  }
  else {
    // Data from form is valid.
    book.save(function (err) {
      if (err) {
        handleError(res, err);
      }
      //successful - redirect to new book record.
      res.send(book);
    });
  }
};

exports.find = function (req, res, next) {
  var query = req.query.text;
  Book.find(
    {$text: {$search: query}},
    {score: {$meta: "textScore"}}
  )
  .sort({score: {$meta: 'textScore'}})
  .exec(function (err, books) {
    if (err) {
      return handleError(res, err);
    } else {
      if (books.length) {
        res.status(200).send({books: books});
      } else {
        res.status(204).send('No Content');
      }
    }

  });

}


// Deletes a Book from the DB.
exports.delete = function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) {
      return handleError(res, err);
    }
    if (!book) {
      return res.status(404).send('Not Found');
    }
    book.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}


