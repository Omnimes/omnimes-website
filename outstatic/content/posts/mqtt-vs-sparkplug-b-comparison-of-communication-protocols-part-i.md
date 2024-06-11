---
title: 'MQTT vs Sparkplug B: Comparison of Communication Protocols Part I'
status: 'published'
author:
  name: 'Martin Szerment'
  picture: '/images/martin.png'
slug: 'mqtt-vs-sparkplug-b-comparison-of-communication-protocols-part-i'
description: 'Comparison of MQTT and Sparkplug B Communication Protocols in the Context of Industrial Internet of Things (IIoT). Learn about their advantages, differences, quality of service (QoS), and message retention. Discover which protocol better meets the requirements of your IoT project.'
coverImage: ''
lang: 'en'
tags: [{"value":"mqtt","label":"MQTT"},{"value":"sparkplugB","label":"Sparkplug B"},{"label":"Communication Protocol","value":"communicationProtocol"},{"value":"qoS","label":"QoS"},{"value":"iIoT","label":"IIoT"},{"label":"IoT Communication","value":"ioTCommunication"},{"value":"omnimes","label":"Omnimes"},{"label":"Industry 4.0","value":"industry40"},{"label":"Communication Standards","value":"communicationStandards"}]
publishedAt: '2024-06-05T09:20:51.000Z'
---

## **Introduction**

In the world of the Industrial Internet of Things (IIoT), choosing the right communication protocol is crucial.

Two popular protocols are **MQTT and Sparkplug B**. Both have their unique features and applications. In this article, we will discuss these protocols, their origins, operation, quality of service, message retention, and the differences between them. Additionally, we will present the application of Sparkplug B in the Omnimes system by Multiprojekt.

## **Origin of MQTT**

The MQTT protocol was invented in 1999 by **Andy Stanford-Clark from IBM and Arlen Nipper from Arcom** (now Cirrus Link). Its main principles are:

- Simple implementation
- Delivery of quality of service (QoS) data
- Lightweight and bandwidth-efficient
- Data independence
- Session continuity (retention)

## **Operation of MQTT**

MQTT operates in a publish/subscribe model, where a client subscribes to specific topics and receives messages. An example topic could be `switch/light/`, and the payload could be a JSON document:

```json
{status: "ON", color:"red", date:"2023-01-08", time:"10:23"}
```

![A diagram illustrating a central red block labeled "Broker" with arrows connecting to five gray blocks titled "Urządzenie 1," "Urządzenie 2," "Urządzenie 3," "Urządzenie 4," and "Urządzenie 5." Arrows indicating "Subscription" and "Publication" illustrate MQTT communication.](/images/publikacja-EyOD.png)

## **Quality of Service (QoS) in MQTT**

MQTT offers three levels of QoS:

- **QoS 0**: "At most once" - The message is delivered once, without acknowledgment.
- **QoS 1**: "At least once" - The message is delivered at least once, with acknowledgment of receipt.
- **QoS 2**: "Exactly once" - The message is delivered exactly once, with acknowledgment of receipt and feedback to the sender.

## **Message Retention in MQTT**

Message retention allows the last state of a message to be saved, which is useful for notifications about the status of devices. This way, a new user can learn about the last known state of the machine.

## **Origin of Sparkplug B**

Sparkplug B is a protocol based on MQTT, developed by **Arlen Nipper (founder of Cirrus Link)**. It was created in response to industry needs, offering a more standardized and less complex protocol compared to **OPC UA**.

## **Differences Between MQTT and Sparkplug B**

1. **Channel and Payload Schema**:
   - **Sparkplug B**: Standardized topic and payload schema. Example topic: `spBv1.0/switch/light/#`. Example payload:

     ```json
     {
       "timestamp": 1673262477011,
       "metrics": [
         {
           "name": "status",
           "timestamp": 1673262477011,
           "dataType": "Int16",
           "value": "ON"
         },
         {
           "name": "color",
           "timestamp": 1673262477011,
           "dataType": "Int16",
           "value": "red"
         }
       ],
       "seq": 9
     }
     ```
   - **MQTT**: Flexibility in creating topics and payloads. Example topic: `switch/light/`. Example payload:

     ```json
     {
       "status": "ON",
       "color": "red",
       "date": "2023-01-08",
       "time": "10:23"
     }
     ```
2. **Message Retention**: 
   - **Sparkplug B**: No native message retention. It is necessary to create a data store that will maintain the last states/information from a given device.
   - **MQTT**: Built-in message retention functionality.

## **Application of Sparkplug B in the Omnimes System by Multiprojekt**

The implementation of Sparkplug B in the Omnimes system has brought several benefits:

- Creation of a configuration wizard
- Simplified connection setup
- No imposition of data structure on the user
- Shifting the responsibility for configuration to the user

![On the computer screen, a dashboard with Polish text, tables, and charts is displayed. Two green arrows point from a JSON code snippet at the top to elements in the lower part, illustrating the connection between input data and control elements on the Omnimes system dashboard.](/images/image-uyot-ywnt-g4OT.png)

## **Summary**

The choice between MQTT and Sparkplug B depends on the specific needs and requirements of the application.

- **MQTT**: More flexible with native message retention.
- **Sparkplug B**: Offers standardized structures and is more optimized for industrial applications.

Both protocols have their place in the IIoT ecosystem, and it is essential to carefully analyze which one best meets the requirements of your project.