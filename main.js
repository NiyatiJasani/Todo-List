 angular.module('todoApp', ['ngRoute'])

         .config(['$routeProvider', function ($routeProvider) {
                 $routeProvider
                         .when('/', {
                                 templateUrl: '/server/views/index.html',
                                 controller: 'mainCtrl'
                         })
                         .when('/todos', {
                                 templateUrl: '/server/views/todos1.html',
                                 controller: 'todoCtrl'
                         });

        }])

         .controller('mainCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {


         }])

         .controller('todoCtrl', ['$scope', '$http', '$location', 'todosFactory', function ($scope, $http, $location, todosFactory) {
                 $scope.todos = [];
                 $scope.isEditable = [];

                 // GET ALL TASKS
                 todosFactory.getTodos()
                         .success(function (data) {
                                 $scope.todos = data;
                         })
                         .error(function (data) {
                                 console.log('Error: ' + data);
                         });

                 //CREATE======
                 $scope.post = function () {

                         $scope.todos = [];
                         var url = "http://localhost:3050/api/todos";
                         dataObj = ({
                                 task: $scope.contAdd
                         });

                         $scope.todos.push(dataObj);
                         console.log($scope.todoText);
                         $scope.todoText = '';


                         todosFactory.post(dataObj)
                                 .success(function () {
                                         console.log("Posted Successfully");
                                         $scope.refresh();
                                 });
                 };

                 // DELETE ======
                 $scope.delete = function (index) {
                         var oldTask = $scope.todos[index];
                         console.log(oldTask._id);

                         return todosFactory.delete(oldTask._id)
                                 .success(function (data) {
                                         console.log(data);
                                         $scope.refresh();

                                 })
                                 .error(function (data) {
                                         console.log('Error: ' + data);
                                 });

                 };
                 //UPDATE=========

                 $scope.edit = function (id, i, field) {

                         $scope.editing = $scope.todos.indexOf(field);
                         $scope.newField = angular.copy(field);
                         console.log(id);
                         $http.get('http://localhost:3050/api/todos/' + id).success(function (response) {
                                 $scope.cont = response;
                                 console.log($scope.cont);
                         });
                 };
                 $scope.update = function (index) {
                         console.log($scope.cont._id);
                         $http.put('http://localhost:3050/api/todos/' + $scope.cont._id, $scope.cont).success(function (resp) {
                                 $scope.refresh();
                         });
                 };

                 $scope.refresh = function () {
                         window.location.reload();
                 };

         }]);
