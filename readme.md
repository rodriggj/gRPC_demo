# grpc 

## Problem It solves for...

If you are building an API or engaging with stakeholders about an existing API, it is widely adopted, perhaps even assumed that the API is `REST-ful`.  

> Why do we assume this? Well because a `REST-ful` API solved several problems. 

1. _the alterantive options to REST needed improvement_ 

Prior to REST, `SOAP`, `XML`, and other contracts were often very complicated both from a development standpoint and from a processing standpoint (heavy payloads requiring an intensive computation). Additionally the payload sizes were inflated for the high-level (human readable formats vs binary formats) syntax, requiring additional bandwidth to maintain transport speeds that would not degrade customer experiences. 

2. _REST provided an intuitive convention_

REST-ful resources by convention followed a `noun` _(URL endpoint)_ / `verb` _(HTTP Method)_ structure that helped enable Developers consuming your API to understand and intuatively navigate the API so they could collect/use the data they needed. 

<p align="center"><img src="https://user-images.githubusercontent.com/8760590/130133350-97feecb8-f59b-4978-ae1d-f5badb321b7d.png" width="450"/></p>

3. _interpretting RESTful output was easy_

Javascript Object Notation, otherwise known as _JSON_, was leveraged as a payload delivery mechanism for both `requests` and `responses` of the API calls. JSON is a human readable, `key:value` format, that was realively easy to consume in a human-readable format, with standard syntax for complex data structues such as Ojects and Arrays that __far__ easier to work with than _XML_; and was lighter and more efficient to transport over the network. 

## So why not stick with REST? 

So if REST solved all these problems, and is so much better than its predecessor then, the obvious question is...

>  Why are you not writing your API in REST?

The answer is because, while REST does solve many problems it also has limitations. 

1. _REST is "Chatty"_

Because of the singularity of the REST-ful convention to identify endpoints by Resource (aka `noun`) in a highly interactive use case where multiple nouns have `associations`, `composition`, and `dependencies`, a Developer will have to make mulitple calls, to collect the associated data required. These mulitple calls introduce bandwidth constraints, throttling limits, scope management determining if the consumer is even authorized to make the needed calls, and in summary becomes very difficult to manage. 

2. _REST introduces a need for "middleware"_

Aside from being _chatty_ another limitation to REST is that the multiple resource calls often require some logic to reconstruct the response needed for the consuming application. This introduces the need for some form of `middleware` or `computational layer` that is used to deserialize payloads, execute data transformation, manage the life-cycle of the data (do you retain for error-handling or purge immediately), etc. in order to construct the appropriate data schema that the consuming entity requires. This middleware introduces security & compliance implications (e.g. Personal Identifiable Information (PAN)), storage & compute implications, and a scope of work that needs to be designed, built, deployed, and maintained. 

3. _REST endpoints can become complex_

To overcome the multiple request problem, and the middleware problem, Developers can get very creative with the URL endpoint construction. Developers will utilize resource paths that blend multiple resources (e.g. Users & Posts) query parameters to execute a query that returns responses required. The unintended consequence of this "creativity" is a degradation of the benefit the `noun/verb` convention benefit created. This also makes versioning and syntax errors a greater problem for Developers to manage.

