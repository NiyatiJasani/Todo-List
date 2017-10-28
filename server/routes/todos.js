(function () {
        var express = require('express');
        var app = express();
        var router = express.Router();
        var mongoose = require('mongoose');
        var bodyParser = require('body-parser');
        var mongojs = require('mongojs');

        mongoose.Promise = global.Promise;

        mongoose.connect('mongodb://niyati:niyati@ds119151.mlab.com:19151/todoapp');


        var Todoschema = new mongoose.Schema({
                task: {
                        type: String,
                        default: ' '
                }
        });

        var Todo = mongoose.model('Todo', Todoschema);


        // Get All Todos
        router.get('/todos', function (req, res, next) {
                Todo.find(function (err, todos) {
                        if (err) return next(err);
                        res.json(todos);
                });
        });


        //POST a task
        router.post('/todos', function (req, res) {

                //create instance of model
                var todo = new Todo();

                //set task properties
                todo.task = req.body.task;

                //save the task
                todo.save(function (err) {
                        if (err)
                                res.send(err);

                        Todo.find(function (todoscalled) {
                                res.json(todoscalled);
                        });

                });


        });

        //        /* GET specific task by id. */
        router.get('/todos/:todo_id', function (req, res) {
                Todo.findById(req.params.todo_id, function (err, todo) {
                        if (err)
                                res.send(err);
                        res.json(todo);
                })
        });

        // Delete Todo
        router.delete('/todos/:todo_id', function (req, res) {
                Todo.remove({
                        _id: req.params.todo_id
                }, function (err, todos) {
                        if (err) res.send(err);
                        res.json(todos);

                });

        });

        // Update Todo
        router.put('/todos/:id', function (req, res) {
                Todo.findById(req.params.id, function (err, todos) {
                        if (err)
                                res.send(err);

                        //set properties
                        todos.task = req.body.task;

                        //save data
                        todos.save(function (err) {
                                if (err)
                                        res.send(err);

                                Todo.find(function (todoscalled) {
                                        res.json(todoscalled);
                                })
                        });
                });
        });

        module.exports = router

})();
