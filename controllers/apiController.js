const Todos = require('../models/todoModel');
let bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  
  app.get('/api/todos/:uname', function (req, res) {
      Todos.find({username: req.params.uname},
          function (err, todos) {
              if(err){throw err;}

              res.send(todos)
          })
  });
  app.get('/api/todo/:id', function (req, res) {
        Todos.findById({_id: req.params.id},
            function (err, todo) {
                if(err) {throw err}

                res.send(todo)
            });
  });

  app.post('/api/todo', function (req, res) {

      console.log(req.body.id);
      if(req.body.id) {
          Todos.findByIdAndUpdate(req.body.id,
              {
                  todo: req.body.todo,
                  isDone: req.body.isDone,
                  hasAttachment: req.body.hasAttachment

              },

              function (err) {
                  if(err) throw err;

                  res.send('success! changed')
              })
      } else {

          const newTodo = Todos({
              username: 'postMan',
              todo: req.body.todo,
              isDone: req.body.isDone,
              hasAttachment: req.body.hasAttachment
          });
          newTodo.save(function (err) {
              if(err) throw err;
              res.send('Success added')
          });

      }

  });

  app.delete('/api/todo', function (req, res) {
      Todos.findByIdAndRemove(req.body.id, function (err) {
          if(err) throw err;
          console.log(req.body.id);
          res.send('Success deleted ' + req.body.username + "  Task");
      })
  })
};