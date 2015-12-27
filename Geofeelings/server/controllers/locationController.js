/**
 * Created by Frederic on 26/12/2015.
 */

var locationController = function (Location) {
    var postLocation = function (req, res){
        if(!req.body.location){
            res.status(400);
            res.send('Location is required');
        }

        if(!req.body.name){
            res.status(400);
            res.send('A name is required');
        }


        //var coordinates = req.body.location.coordinates.split(',').map(Number);


        var location = new Location({
            location: req.body.location,
            name : req.body.name
        });

        location.save(function(err){
            if(err){
                res.status(500).json({message: 'Location might already exist'});
                return;
            }

            res.status(201);
            res.send(location);
        });
    }

    return {
        postLocation: postLocation
    }
}

module.exports = locationController;