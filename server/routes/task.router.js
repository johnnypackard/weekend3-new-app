const express = require( 'express' );
const router = express.Router();
const ToDo = require( '../modules/toDo.schema' );

router.get( '/', ( req, res ) =>{
    ToDo.find({})
    .then( ( data ) => {
        res.send( data );
    }).catch( ( error ) => {
        console.log( 'error in GET', error );
        res.sendStatus( 500 );
    })
});

router.post( '/', ( req, res ) => {
    console.log( 'POST /taskList:', req.body );
    let newTask = new Task( req.body );
    newTask.save()
    .then( () => {
        console.log( 'task added:', newTask );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( 'error in POST', error );
        res.sendStatus( 500 );
    })
});

router.put( '/:id', ( req, res ) => {
    console.log( 'put', req.body );
    console.log( 'put params', req.params );
    ToDo.findByIdAndUpdate( req.params.id, req.body )
    .then( () => {
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( 'error from PUT', error );
        res.sendStatus( 500 );
    })
});

router.delete( '/:id', ( req, res ) => {
    console.log( 'delete', req.params );
    ToDo.findByIdAndRemove( req.params.id )
    .then( () => {
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( 'error in Delete', error );
        res.sendStatus( 500 );
    })
})

module.exports = router;