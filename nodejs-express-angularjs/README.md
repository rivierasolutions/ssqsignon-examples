# Node.js - Express.js - Angular.js setup

## 1. Register with *SSQ singon* and create a *module*.
 
1.1 - In *step 1* of the module creation wizard, add `http://localhost:9901` and `http://localhost:9902` to the list of *Allowed origins*.

1.2 - In *step 2* of the module creation wizard, select the `dummy endpoint` and some dummy user accounts.
At least some of the accounts should contain the scopes `cat`, `dog` and `hamster`, which will be used in the example.
For example, the following dummy user accounts may be created:

- username: `test`, password: `testtest`, scope: `cat`
- username: `test2`, password: `testtest2`, scope: `cat dog hamster`
- username: `test3`, password: `testtest3`, scope: `dog hamster`

1.3 - In *step 3* of the module creation wizard, select the `password` authorization type for your first client, and check
the `use dummy user endpoint` and `generate refresh tokens` checkboxes. 

## 2. Checkout the repository.

## 3. Npm install
In the command prompt, navigate to the `/nodejs-angularjs` directory, and run `npm install`.

## 4. Basic web app

- In the command prompt, navigate to `/nodejs-angularjs/basic-webapp` and run 

        node server.js [your-module-name] [your-client-id]
    where `[your-module-name]` is the name of the module you've created in step 1, and `[your-client-id]` is the Id of the client 
    you've registered in step 1 (you may check this value in your module's *clients* section).
    If all goes well you should see the `web app listening on port 9901` message.

- Open your web browser and navigate to
 
        http://localhost:9901
    You may now login with the dummy user accounts you've created in step 1.
    Users that have the `cat` scope will be able to see a picture of a cat after logging in.
    Users that have the `dog` scope will be able to see a picture of a dog after logging in.
    
## 5. SSO slave web app

- The *basic web app* that you set up in step 4 should already be up and running. 

- In the [SSQ signon module admin](https://ssqsignon.com/moduleadmin), register a new client with the *authorization
 type* set to `Authorization code`, the *use dummy user endpoint* and *generate refresh tokens* checkboxes checked,
 and `http://localhost:9902` added to the list of *valid redirect URIs*. 

- In the command prompt, navigate to `/nodejs-angularjs/sso-slave-webapp` and run 

        node server.js [your-module-name] [your-client-id] [your-client-secret] 
    where `[your-module-name]` is the name of the module you've created in step 1, and `[you-client-id]` and `[your-client-secret]`
    are the *client id* and *client secret* of client you've registered in step 5.2.
    If all goes well you should see the `web app listening on port 9902` message.

- Open your web browser and navigate to 

        http://localhost:9902. 
    Clicking the *login with SSQ singon example app* button will redirect you to the *basic web app*
    for Single Sign on. Once logged in, users that have the `hamster` scope will be able to see a picture of a hamster.
  
## 6. The http users endpoint

6.1 Deploy the node.js server found in `/nodejs-angularjs/http-users-endpoint/server.js` on your favourite hosting service. You may want to edit to `port`
    variable to 80.

6.2 Go to the *Settings* section of your module in the [SSQ signon module admin](https://ssqsignon.com/moduleadmin) and
Scroll down to the *HTTP users endpoint* panel. Check the enabled checkbox, set both the *Authenticate and authorize URI* and
*Reauthorize URI* to the `/users` path on your deployed server, e.g. `http://path-to-your-deployed-server-js/users`. Leave the
*Authentication type* as `Basic`, set the *Username* to `example` and the password to `testtest`.

6.3 **Save changes** to your module settings.

6.4 Go to the *Clients* section of your module in the [SSQ signon module admin](https://ssqsignon.com/moduleadmin),
edit both previously created clients and uncheck the *use dummy user endpoint* checkbox.

6.5 You should now be able to log in to *basic web app* and *SSO slave web app*  using the 2 accounts hardcoded into `server.js`:
`test1@users.com` (password: `testtest1`) and `test2@users.com` (password: `testtest2`).