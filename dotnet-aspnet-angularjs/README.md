# ASP.Net - Angular.js setup

## 1. Register with *SSQ singon* and create a *module*.
 
1.1 - In *step 1* of the module creation wizard, add `http://localhost:59186` and `http://localhost:62326` to the list of *Allowed origins*.

1.2 - In *step 2* of the module creation wizard, select the `dummy endpoint` and some dummy user accounts.
At least some of the accounts should contain the scopes `cat`, `dog` and `hamster`, which will be used in the example.
For example, the following dummy user accounts may be created:

- username: `test`, password: `testtest`, scope: `cat`
- username: `test2`, password: `testtest2`, scope: `cat dog hamster`
- username: `test3`, password: `testtest3`, scope: `dog hamster`

1.3 - In *step 3* of the module creation wizard, select the `password` authorization type for your first client, and check
the `use dummy user endpoint` and `generate refresh tokens` checkboxes. 

## 2. Checkout the repository.

## 3. Build the solution
Open `/aspnet-angularjs/aspnet-angularjs.sln` with Visual Studio (2013+). The NuGet packages should be downloaded automatically.

## 4. Basic web app

4.1 Rename the `/aspnet-angularjs/basic-webapp/SSQSignon.example.config` file to `/aspnet-angularjs/basic-webapp/SSQSignon.config`.

4.2 Open the `/aspnet-angularjs/basic-webapp/SSQSignon.config` file and change the `SSQSignonModuleName` value to the name of the module you've created in step 1.

4.3 Rename the `/aspnet-angularjs/basic-webapp/client/config.example.js` file to `/aspnet-angularjs/basic-webapp/client/config.js`.

4.4 Open the `/aspnet-angularjs/basic-webapp/client/config.js` file and change the `SSQSIGNON_MODULE_NAME` value to the name of the module you've created in step 1.
Also, change the `SSQSIGNON_CLIENT_ID` value to the *client id* of the client you've registered in step 1 (you may
check this value in your module's *clients* section).

4.6 Run the `basic-webapp` project. If all goes well your browser will be directed to `http://localhost:59186/client` and you will see the login dialog.

4.7 You may now login with the dummy user accounts you've created in step 1.
    Users that have the `cat` scope will be able to see a picture of a cat after logging in.
    Users that have the `dog` scope will be able to see a picture of a dog after logging in.
    
## 5. SSO slave web app

5.1 The *basic web app* that you set up in step 4 should already be up and running. 

5.2 In the [SSQ signon module admin](https://ssqsignon.com/moduleadmin), register a new client with the *authorization
 type* set to `Authorization code`, the *use dummy user endpoint* and *generate refresh tokens* checkboxes checked,
 and `http://localhost:62326/client` added to the list of *valid redirect URIs*. 

5.3 Rename the `/aspnet-angularjs/sso-slave-webapp/SSQSignon.example.config` file to `/aspnet-angularjs/sso-slave-webapp/SSQSignon.config`.

5.4 Open the `/aspnet-angularjs/sso-slave-webapp/SSQSignon.config` file and change the `SSQSignonModuleName` value to the name of the module you've created in step 1.
  Also change the `SSQSignonClientId` and `SSQSignonClientSecret` to the *client id* and *client secret* of client you've registered in step 5.2.
  
5.5 Rename the `/aspnet-angularjs/sso-slave-webapp/client/config.example.js` file to `/aspnet-angularjs/sso-slave-webapp/client/config.js`.

5.6 Open the `/aspnet-angularjs/sso-slave-webapp/client/config.js` file and change the `SSQSIGNON_MODULE_NAME` value to the name of the module you've created in step 1.
Also, change the `SSQSIGNON_CLIENT_ID` value to the *client id* of client you've registered in step 5.2.

5.7 Run the `sso-slave-webapp` project. If all goes well your browser will be directed to `http://localhost:62326/client` and you will see the app page.

5.8 Clicking the *login with SSQ singon example app* button will redirect you to the *basic web app*
  for Single Sign on. Once logged in, users that have the `hamster` scope will be able to see a picture of a hamster.
  
## 6. The http users endpoint

6.1 Publish the web server found in the `http-users-endpoint` to your favourite hosting service.

6.2 Go to the *Settings* section of your module in the [SSQ signon module admin](https://ssqsignon.com/moduleadmin) and
Scroll down to the *HTTP users endpoint* panel. Check the enabled checkbox, set both the *Authenticate and authorize URI* and
*Reauthorize URI* to the `/users` path on your deployed server, e.g. `http://path-to-your-deployed-server-js/users`. Leave the
*Authentication type* as `Basic`, set the *Username* to `example` and the password to `testtest`.

6.3 **Save changes** to your module settings.

6.4 Go to the *Clients* section of your module in the [SSQ signon module admin](https://ssqsignon.com/moduleadmin),
edit both previously created clients and uncheck the *use dummy user endpoint* checkbox.

6.5 You should now be able to log in to *basic web app* and *SSO slave web app*  using the 2 accounts hardcoded into `server.js`:
`test1@users.com` (password: `testtest1`) and `test2@users.com` (password: `testtest2`).