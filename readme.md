# Unary API

## Steps to reproduce 

### Environment Setup (NodeJs)
- [ ] Install NodeJS [here](https://nodejs.org/en/)
- [ ] Install a code editor - recommend Visual Studio Code [here](https://code.visualstudio.com/download)
- [ ] (Optional) Configure the VS Code Editor
    + Install package `vscode-proto3`

### First Unary API 

Steps: 
1. Open a terminal and verify you have `nodejs` installed 
```javascript
node --version

// v16.6.1
```

2. We will need to Install a few NPM packages to manage our grpc commands. We will install `grpc-tools`, `google-protobuf`, and `grpc`
```javascript
node i -g install grpc-tools google-protobuf grpc
//or 
node i install grpc-tools google-protobuf grpc --save
```
> It is debatable whether you need to install these tools at a global lever (e.g. `-g` flag) versus the root directory of your project. Your choice. If you install at global level you will not see your dependencies appear in the package.json file, and you do not need the `--save` flag. If you want the package.json to contain your dependencies, use the `--save` flag. You can verify that the package installation was completed by opening your `package.json` file and viewing the `dependencies` node. 

3. Create directory structure for code
```javascript 
cd ~/Desktop
mkdir grpc-demo
mkdir grpc-demo/protos grpc-demo/client grpc-demo/server
cd grpc-demo
```

4. Initiate the nodejs project, which will create your `package.json` file
```javascript 
npm init -y
```

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

> __RESULTS:__ If your command executed without error, you can now nav to the `server` folder in your directory and see that 2 `.js` files were created for you. 1. `greet_grpc_pb.js` & 2. `greet_pb.js`. If you open these files you will see `GENERATED CODE -- DO NOT EDIT` comments above the code that was generated for you by the `grpc plugins` you installed. 

8. Now that our code is generated for our API, we now need to configure our front-end `client` and our back-end `server` to utilize the code grpc generated for us. Recall that in a `Unary` grpc deployment model, a client side application will submit a `request` to our server which will provide a `response` just like typical SOAP or REST call would perform. 

We will being by configuring our `server`. You should still be in the `/server` directory but if not, nav there now, and create a new file called `index.js`

```javascript
code index.js
```

9. 