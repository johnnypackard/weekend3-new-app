const app = angular.module( 'TaskApp', [] );

app.controller( 'TaskController', ['$http', function( $http ) {
    let vm = this;
    vm.tasks = [];

    vm.addTask = function() {
        let newTask = new Task( vm.titleIn, vm.priorityIn, vm.taskInfoIn, vm.dueDateIn );
        console.log( 'adding new task:', newTask );
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
        console.log( 'in getTasks', getTasks );
        $http({
            method: 'GET',
            url: '/tasks'
        }).then( function( response ){
            vm.tasks = response.data;
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

    vm.completeTask = function(taskCompleted) {
        console.log( 'BAM! Finished a task!' );
        console.log( 'task to mark as completed', taskCompleted );
        let updatedTask = {
            completed: true
        }
        $http({
            method: 'PUT',
            url: `/tasks/${taskCompleted._id}`,
            data: updatedTask
        }).then( function( response ) {
            vm.getTasks();
        }).catch( function ( error ) {
            console.log( 'error from PUT', error );
        })
    }

    vm.removeTask = function( taskRemoval ) {
        console.log( 'Begone, you task!' );
        console.log( taskRemoval );
        if( confirm( 'Do you REALLY want to delete this?' )) {
            $http({
                method: 'DELETE',
                url: `/tasks/${taskRemoval._id}`
            }).then( function( response ) {
                vm.getTasks();
            }).catch( function( error ) {
                console.log( 'error from DELETE', error );
            })
        }
    }

    $http.editingData = {};

    for (let i=0, length = $http.task.length; i < length; i++) {
        $http.editingData[$http.task[i].id] = false;
    }
    $http.modify = function(task){
        $http.editingData[task.id] = true;
    };
    $http.update = function(task){
        $http.editingData[task.id] = false;
    };

    vm.getTasks();
}]);