const express = require( 'express' );
const router = express.Router();
const Task = require( '../modules/task.schema' );

router.post( '/', ( req, res ) => {
    console.log( req.body );
    Task.create( req.body )
    .then( () => {
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( 'error in POST', error );
        res.sendStatus( 500 );
    })
});

router.get( '/', ( req, res ) =>{
    Task.find({})
    .then( ( data ) => {
        res.send( data );
    }).catch( ( error ) => {
        console.log( 'error in GET', error );
        res.sendStatus( 500 );
    })
});

router.put( '/:id', ( req, res ) => {
    console.log( 'put', req.body );
    console.log( 'put params', req.params );
    Task.findByIdAndUpdate( req.params.id, req.body )
    .then( () => {
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( 'error from PUT', error );
        res.sendStatus( 500 );
    })
});

router.delete( '/:id', ( req, res ) => {
    console.log( 'delete', req.params );
    Task.findByIdAndRemove( req.params.id )
    .then( () => {
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( 'error in Delete', error );
        res.sendStatus( 500 );
    })
})

module.exports = router;