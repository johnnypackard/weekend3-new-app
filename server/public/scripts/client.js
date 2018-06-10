const app = angular.module( 'ToDoApp', [] );

class Task{
    constructor( title, priority, taskInfo, dueDate ){
        this.title = title;
        this.priority = priority;
        this.taskInfo = taskInfo;
        this.dueDate = dueDate;
        this.completed = false;
    } // end constructor
} // end Task class

app.controller( 'ToDoController', ['$http', function( $http ) {
    let vm = this;
    vm.toDos = [];

    vm.addTask = function() {
        let newTask = new Task( vm.titleIn, vm.priorityIn, vm.taskInfoIn, vm.dueDateIn );
        console.log( 'adding new task:', vm.newTask );
        $http({
            method: 'POST',
            url: '/tasks',
            data: vm.newTask
        }).then( function( response ) {
            vm.clearInputs();
            vm.getTasks();
        }).catch( function( error ) {
            console.log( 'error from POST', error );
        });
    }

    vm.getTasks = function() {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then( function( response ){
            vm.toDos = response.data;
        }).catch( function( error ) {
            console.log( 'error from GET', error );
        })
    }

    vm.clearInputs = function() {
        vm.newTask = {
            titleIn: '',
            priorityIn: '',
            taskInfoIn: '',
            dueDateIn: ''
        }
    }

    vm.completeTask = function(selectedToDo) {
        console.log( 'BAM! Finished a task!' );
        console.log( 'task to mark as completed', selectedToDo );
        let updatedData = {
            completed: true
        }
        $http({
            method: 'PUT',
            url: `/tasks/${selectedToDo._id}`,
            data: updatedData
        }).then( function( response ) {
            vm.getTasks();
        }).catch( function ( error ) {
            console.log( 'error from PUT', error );
        })
    }

    vm.removeTask = function( taskToDelete ) {
        console.log( 'Begone, you task!' );
        console.log( taskToDelete );
        if( confirm( 'Do you REALLY want to delete this?' )) {
            $http({
                method: 'DELETE',
                url: `/tasks/${taskToDelete._id}`
            }).then( function( response ) {
                vm.getTasks();
            }).catch( function( error ) {
                console.log( 'error from DELETE', error );
            })
        }
    }

    vm.modify = function(task) {
        $http.editingData = {};

        for (let i=0, length = $http.tasks.length; i < length; i++) {
            $http.editingData[$http.tasks[i].id] = false;
        }
        $http.modify = function(tasks){
            $http.editingData[tasks.id] = true;
        };
        $http.update = function(task){
            $http.editingData[tasks.id] = false;
        };
    } // modify

    vm.getTasks();
}]);