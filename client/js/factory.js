angular.module('todoApp')

        .factory('todosFactory', function ($http) {
                var factory = {};
                var url = "http://localhost:3050/api/todos/";


                factory.getTodos = function () {
                        return $http.get(url);
                };

                factory.findTodo = function (id) {
                        return $http.get(url + '/' + id);
                };

                factory.post = function (obj) {
                        return $http.post(url, obj);
                };

                factory.delete = function (id) {
                        return $http.delete(url + id);
                };

                return factory;
        });
