# header-forwarding-poc
This is a proof of concept that shows how headers can be forwarded without any "controller code".

 1. clone repo
 1. `npm install`
 1. `npm start`
 1. go to 'http://localhost:2018'
 1. see an empty object, confirming that no headers were forwarded
 1. use a browser extension to set the header 'my-secret-header' to any value you desire.
 1. reload the page
 1. see and object like:
 ```JSON 
     {
        "secretHeader": "foo"
     }
 ```    
 This shows that the header was forwarded.
