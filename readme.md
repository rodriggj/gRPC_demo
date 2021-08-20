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

2. Install a NPM package to manage grpc commands called `grpc-tools`
```javascript
node i -g install grpc-tools --save
```

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

> What does the `.proto` file do? The `.proto` file, is effectively the schema for your API. Here you will define boilerplate components along with custom definitions of your API. 

6. On the `protos/greet.proto` file we want to begin with some boilerplate code. Here we want to define: 
    1. _syntax_
    2. _package_ 
    3. _message_ 
    4. _service_

In our `Greeting` API we will use these 4 components to create our API. 

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

7. 
