# grpc 

## Problem It solves for...

If you are building an API or engaging with stakeholders about an existing API, it is widely adopted, perhaps even assumed that the API is `REST-ful`.  

> Why do we assume this? Well because a `REST-ful` API solved several problems. 

1. _the alterantive options needed improvement_ 

Prior to REST, `SOAP`, `XML`, and other contracts were often very complicated both from a development standpoint and from a processing standpoint (heavy payloads requiring an intensive computation). Additionally the payload sizes were inflated for the high-level (human readable formats vs binary formats) syntax, requiring additional bandwidth to maintain transport speeds that would not degrade customer experiences. 

2. _provided an intuitive convention_

REST-ful resources by convention followed a `noun` _(URL endpoint)_ / `verb` _(HTTP Method)_ structure that helped enable Developers consuming your API to understand and intuatively navigate the API so they could collect/use the data they needed. 

<p align="center"><img src="https://user-images.githubusercontent.com/8760590/130133350-97feecb8-f59b-4978-ae1d-f5badb321b7d.png" width="450"/></p>