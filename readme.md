# Unary API

## Steps to reproduce 

### Environment Setup (NodeJs)
- [ ] Install NodeJS [here](https://nodejs.org/en/)
- [ ] Install a code editor - recommend Visual Studio Code [here](https://code.visualstudio.com/download)
- [ ] (Optional) Configure the VS Code Editor
    + Install package `vscode-proto3`

### First Unary API 

Steps: 
1. Open a terminal and verify you have `nodejs` installed. If not install it (see _Environment Setup_ above)

```javascript
node --version

// v16.6.1
```

2. Create directory structure for code
```javascript 
cd ~/Desktop
mkdir grpc-demo
mkdir grpc-demo/protos grpc-demo/client grpc-demo/server
cd grpc-demo
```

3. Initiate the nodejs project, which will create your `package.json` file
```javascript 
npm init -y
```

4. We will need to Install a few NPM packages to manage our grpc commands. We will install `grpc-tools`, `google-protobuf`, and `grpc`
```javascript
npm i -g install grpc-tools google-protobuf grpc
//or 
npm i install grpc-tools google-protobuf grpc --save
```
> It is debatable whether you need to install these tools at a global level (e.g. `-g` flag) versus the root directory of your project. Your choice. If you install at global level you will not see your dependencies appear in the package.json file, and you do not need the `--save` flag. If you want the package.json to contain your dependencies, use the `--save` flag. You can verify that the package installation was completed by opening your `package.json` file and viewing the `dependencies` node. 

5. Within the `protos` dir, create a file called `greet.proto`
```javascript 
code protos/greet.proto
```

> What does the `.proto` file do? The `.proto` file, is effectively the schema for your API. Here you will define boilerplate components along with custom definitions of your API. This file therefore acts as a `manifest` that we feed the `grpc` factory, that will produce our API code. 

6. On the `protos/greet.proto` file we want to begin with some boilerplate code. Here we want to define: 1. _syntax_ 2. _package_ 3. _message_ 4. _service_

```protobuf
syntax = "proto3"; 

package greet; 

service GreetService {
    rpc Greet (GreetRequest) returns (GreetResponse) {}
}

message Greeting {
    string first_name =1; 
    string last_name = 2; 
}

message GreetRequest {
    Greeting greeting = 1; 
}

message GreetResponse {
    string result = 1;
}
```

7. Now that we have defined the API schema, we need to utilize the `grpc plugins` to read the `.proto` definition and create the code for us. To do this we will run the following command: 

```javascript 
protoc -I=. ./protos/greet.proto \
   --js_out=import_style=commonjs,binary:./server \
   --grpc_out=./server \
   --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
```

> __RESULTS:__ If your command executed without error, you can now nav to the `server` folder in your directory and see that a new directory called `protos` has  been created with two(2) `.js` files were created for you. 
1. `greet_grpc_pb.js` & 
2. `greet_pb.js`. 
If you open these files you will see `GENERATED CODE -- DO NOT EDIT` comments above the code that was generated for you by the `grpc plugins` you installed. 

8. Now that our code is generated for our API, we now need to configure our front-end `client` and our back-end `server` to utilize the code grpc generated for us. Recall that in a `Unary` grpc deployment model, a client side application will submit a `request` to our server which will provide a `response` just like typical SOAP or REST call would perform. 

We will being by configuring our `server`. You should still be in the `/server` directory but if not, nav there now, and create a new file called `index.js`

```javascript
code server/index.js
```

9. We need start with some boilerplate script. We need to create a `main` function and invoke `main()`; we'll populate the function later. And we need to instantiate a `Server` Object using the `grpc` package we installed previously; so we need to require in this module.

```javascript 
var grpc = require('grpc');

function main() {

}

main()
```

10. Now we can create/configure our Server. Replace the `main()` function already on the `index.js` file enter the code below.

The Server Object that we want to create is in the `grpc` module. Import the `grpc` module into your script with the require statement. Now we want to take our newly imported module and create a new `Server` Object. The next step will be to bind the Server to a `port`. 

This `bind()` method requires two(2) arguements 1. a string value for the port mapping & 2. credentials. Per the grpc spec, we will pass port `50051`, and in this case we are not passing any credentials so we will use the `createInsecure()` method of the `ServerCredentials` object found in the `grpc` module. Once created we will start the server, and log to the console that it is running. 

```javascript
function main() {
    var server = new grpc.Server()
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
    server.start()
    console.log('Server is up and running...')
}
```

> __NOTE:__ If you attempt to run the `index.js` file right now, you will get an error, `Error: Cannot find module './server/protos/greet_pb'`. This is because we need to import the generated code the the grpc creaeted for us.

11. Import the `protos` files that were generated for the Greet API. On the `index.js` file, at the very top enter these two(2) _require_ statements. Here we assign the `greet_pb` file to `greets` and the `service` variable will be assigned the `greet_grpc_pb` file. 

```javascript 
var greets = require('./protos/greet_pb')
var service = require('./protos/greet_grpc_pb')
```

12. Now we need to implement the `rpc` function. Under the _require_ statements, and above the `main()` function enter the code below. 

First we need to creat a function `greet()`, and pass in 2 arguments, 1. `res` & 2. `cb`. The `res` arguement is a placeholder for the API "response" data that is returned from the `GreetResponse` Object that was created by grpc. This argument can be named whatever you like. The `cb` argument is a standard callback function. 

Within the `greet()` function we will want to reference the code that grpc created for us, specifically the `GreetResponse` Object that was created. We will bind this reference to the var `greeting`. Now we can call the method created for us by grpc called, `setResult()`. This method, can be found in the `greet_pb.js` file. Within the `setResult()` method, we can use our other arguement `res`, which contains the data from the API response, and call the `getter` methods that grpc created for us. Specifcally `getFirstname` and `getLastname` which were attributes we defined in our `greet.proto` schema (see Step 6 above).

Finally we need to implement a callback method to call the `greet()` function we just created. 

```javascript 
function greet(res, cb) {
    var greeting = new greets.GreetRepsonse()

    greeting.setResult(
        "Hello" + res.request.getGreeting().getFirstname()
    )

    cb(null, greeting)
}
```

> _NOTE_: The function name `greet()` function in the index.js file needs to be the same as the name of the Object that is being exported in the `greet_grpc_pb.js` file. 

<p align="center"><img src="https://user-images.githubusercontent.com/8760590/130302237-4735c1cf-8e5e-4667-9fc7-663e26157114.png" width="450"/></p>

13. The last thing we have to do with this file is leverage the `Service` that was created by grpc. To do this we need to register this service with our `main()` method. We need to do this so grpc knows _what_ service to use when it implements the RPC method we just configured.

In the `main()` function in the `index.js` file, under the line that created the Server object, enter the following line of code. 

First we want to call the `server` Object and leverage the `addService()` method. We will pass the `addService()` method two(2) arguements 1.the first arguement references the `service` variable we created which was the output from the `greet_grpc_pb.js` file. Within this file is the output of the grpc generated code (aka our API, which was provided a name by the grpc plugin, _GreetServiceService_. (see diagram below). This is the service which will execute our Greet function we just created. 2. the second arguement is letting the _GreetServiceServic_ know what we want to register with it, and in this case it is the _greet_ function we just created so we will pass it this function as an Object with key:value notation. It is convention that the key & value are the same. 

```javascript 
function main(){
    //var server = new grpc.Server()
    
    server.addService(service.GreetServiceService,{greet:greet})
    
    //...
}

main()
```

<p align="center"><img src="https://user-images.githubusercontent.com/8760590/130307287-9dc9d1fb-d19c-45d8-bee5-95e1f7e19e53.png" width="450"/></p>

Your completed `index.js` file should look like this: 

```javascript 
var greets = require('./protos/greet_pb')
var service = require('./protos/greet_grpc_pb')
var grpc = require('grpc');

function greet(res, cb) {
    var greeting = new greets.GreetRepsonse()

    greeting.setResult(
        "Hello" + res.request.getGreeting().getFirstname()
    )

    cb(null, greeting)
}

function main() {
    var server = new grpc.Server()
    server.addService(service.GreetServiceService,{greet:greet})
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
    server.start()
    console.log('Server is up and running...')
}

main()
```
