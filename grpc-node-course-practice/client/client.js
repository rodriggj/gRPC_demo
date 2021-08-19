var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')

var grpc = require('grpc')

function main(){

console.log(`Hello from Client`)
    var client = new service.GreetServiceClient(`localhost:50051`, grpc.credentials.createInsecure())
    // console.log(`client:`, client)

    //created our request
    var request = new greets.GreetRequest()
    
    //created a protocol buffer greeting message
    var greeting = new greets.Greeting()
    greeting.setFirstName("Jerry")
    greeting.setLastName("Garcia")

    //set the greeting
    request.setGreeting(greeting)

    client.greet(request, (error,response) => {
        if(!error) {
            console.log("Greeting Response: " + response.getResult())
        } else {
            console.log(error)
        }
    })
}

main()