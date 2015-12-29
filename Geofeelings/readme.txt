controllers/ – defines your app routes and their logic
helpers/ – code and functionality to be shared by different parts of the project
middlewares/ – Express middlewares which process the incoming requests before handling them down to the routes
models/ – represents data, implements business logic and handles storage
public/ – contains all static files like images, styles and javascript
views/ – provides templates which are rendered and served by your routes
tests/ – tests everything which is in the other folders
package.json – remembers all packages that your app depends on and their versions

public/ - all frontend and angular stuff
    js/
        controllers/ - angular controllers
        services/ - This is where you would use $http or $resource to do your API calls to the Node backend from your Angular frontend.
        app.js - angular application
        approutes.js - angular routes
    libs/ - created by bower install
    views/

.bowerrc - tells bower where to put files (public/libs)
bower.json - tells bower which files we need
package.json - tells npm which packages we need
server.js - set up our node application

