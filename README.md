Undoiverse
==========




Contents
--------

- [Introduction](#introduction)
- [Project Goals](#project-goals)
- [Scope](#scope)
- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [Plugins](#plugins)
- [Advanced Usage](#advanced-usage)
- [Command Line](#command-line)
- [About Loop.Coop](#about-loopcoop)
- [Changelog and Roadmap](#changelog-and-roadmap)
- [Contributing](#contributing)




Introduction
------------

The dream of virtual worlds has fired our collective imagination for a long 
while. A [metaverse](https://en.wikipedia.org/wiki/Metaverse) where people can 
meet, learn, make things and share ideas. Recent web technologies (WebGL, Web 
Audio, WebSockets, WebVR) provide the foundations for immersive 3D experiences 
on the web. But for multi-user creative apps we need something extra. 

[Undoiverse](http://undoiverse.loop.coop) is an open source Javascript module 
which manages the interactions between users and elements in a ‘free roaming’ 3D
environment. 

Say you want to develop a ‘Scrapheap Challenge’ app. A dozen mechanics in two 
teams scavenge a giant pile of rusty parts, and race to assemble a working car. 
The app randomly generates a few thousand car parts, and then Undoiverse tracks 
their positions and attributes as mechanics collect them, carry them, chop them 
up and weld them together. 

The core Undoiverse module provides a basic API for adding elements into a 3D 
space. Your app can easily set and get an element’s bounding box, position and 
rotation, and also set and get whatever custom attributes you need. During an 
element’s lifecycle it may be chopped in two (divided) or welded to another 
element (joined), before eventually being deleted. Your app can listen for 
changes to all the elements, or a subset of them, or to a single element. The 
Undoiverse core has a basic understanding of users and avatars — enough to let
users pick elements up, modify them, and put them down. 

__@todo__ Introduce plugins section-by-section, explaining how ‘Scrapheap 
Challenge’ would use each of them. 

In addition to its core features, Undoiverse has a range of plugins: 

- Copy, Cut, Paste and Duplicate
- Group and Ungroup
- Open and Close
- Save and Save As
- Credentials and Permissions
- Lock and Unlock
- Search and Filter
- Move and Zoom Viewpoint
- Broadcast and Notifications
- Conference and Private Messaging

With the ‘Git Archive’ plugin installed in your ‘Scrapheap Challenge’ app, 
Undoiverse records everything that each mechanic does. This allows you enable 
other history-based plugins like: 

- Rewind and Playback
- Undo and Redo
- Fork and Merge
- Historical Analysis

So you can use a GitHub repo to rewind and replay the process of building a car,
or allow mechanics to undo their mistakes. 

__@todo__ Write a conclusion to the Introduction. 




Project Goals
-------------

__@todo__ Write the Project Goals section. 




Scope
-----


### Core Scope


### Plugin Scopes




Getting Started
---------------


### Installing on OpenShift


### Connecting to a GitHub repo




Basic Usage
-----------


### Instantiation

Usually we think about a Node process running a single Undoiverse instance. But 
two or more Undoiverse instances can happily coexist:  
```js
let lumpySpace = new Undoiverse();
let candyKingdom = new Undoiverse();
```

Above, we’ve instantiated without passing any configuration. That’s the same as
instantiating with the following defaults:  
```js
let lumpySpace = new Undoiverse({
    extent: { x:1000, y:1000, z:1000 }
  , fs: require('fs')
    //@todo add a listing of all default config
});
```


### Events

```js
lumpySpace.on('log', (severity, code, template, ...values) => {
    console.log(severity, code, printf(template, values) ); 
}); //@todo define `printf()`
```


### Properties


### Methods


### Exceptions


### Browser Usage

Undoiverse is optimized to run under Node on a server, but it can also be made 
to run in a browser:  
```js
let lumpySpace = new Undoiverse({
    fs: {
        readFile: () => {}
    } //@todo create a full fs shim, based on localStorage
});
```




Plugins
-------

__@todo__ Describe Undoiverse’s plugin architecture — we intend to cease all major 
updates to the Undoiverse core by the end of 2017, so any progress beyond that 
will be made through plugins, hopefully with help by the community. 


### Persistence Plugins

#### File System

#### Database

#### Meteor Integration


### History Plugins

#### Git Archive

#### Rewind and Playback

#### Undo and Redo

#### Fork and Merge

#### Historical Analysis


### Query Plugins

#### Search and Filter

#### Move and Zoom Viewpoint


### Ownership Plugins

#### Open and Close

#### Save and Save As

#### Credentials and Permissions

#### Lock and Unlock


### Composition Plugins

#### Group and Ungroup

#### Copy, Cut, Paste and Duplicate


### Communication Plugins

#### Broadcast and Notifications

#### Conference and Private Messaging


### Homegrown Plugins




Advanced Usage
--------------


### Profiling and Benchmarking


### Optimizing Performance




Command Line
------------

__@todo__ Describe how to monitor and control a Node process running an Undoiverse 
instance on a remote server, eg via SSH. Also, an Undoiverse instance running 
in a browser, via the Javascript console. 




About Loop.Coop
---------------

Undoiverse is an open source project by digital tinkerers 
[Loop.Coop](http://loop.coop/). 




Changelog and Roadmap
---------------------

Tasks are popped off the ‘Roadmap’ list and added to the ‘Changelog’ list. If 
the ‘ATA’ date matches or beats the ‘ETA’ date, then we’re winning! 


### Changelog

- Create a GitHub repo with fairly standard NPM-development stuff.  
  README.md first draft.  
  V: 0.0.1  
  ETA: 20160908  
  ATA: 20160909


### Roadmap

- README.md Second Draft.  
  V: 0.0.2  
  ETA: 20160914  

- README.md Third Draft.  
  V: 0.0.3  
  ETA: 20160921 

- Change README.md from ‘Draft’ to ‘Live’ status. This means that the project 
  goals, scope and API have been agreed by the team and set in stone.  
  V: 0.1.0  
  ETA: 20160928  

- Non-functional module with a few basic unit tests, which all fail.  
  Build and deploy systems in place.  
  V: 0.2.0  
  ETA: 20161005  

- Barely functional module which passes a few basic unit tests.  
  V: 0.3.0  
  ETA: 20161012  

- A stronger core (details tbc), passing a decent set of unit tests.  
  V: 0.4.0  
  ETA: 20161019  

- Plugin system (including homegrown plugins) working in principal, but no work
  on real plugins yet.  
  Core essentially working, but not optimised or thoroughly tested.  
  V: 0.5.0  
  ETA: 20161026  

- Core production-ready, thoroughly tested and reasonably well optimised.  
  V: 0.6.0  
  ETA: 20161109  

- Command Line basically functional, passing a fairly good set of unit tests.  
  V: 0.7.0  
  ETA: 20171116  

- Core usage examples complete, including examples of homegrown plugins.  
  Documentation tidy and correct.  
  V: 1.0.0  
  ETA: 20161123  

- ‘Git Archive’ history plugin production-ready.  
  V: 1.1.0  
  ETA: 20161207  

- Other history plugins production-ready: Rewind and Playback, Undo and Redo, 
  Fork and Merge, Historical Analysis.  
  V: 1.2.0  
  ETA: 20161228  

- Query plugins production-ready: Search and Filter, Move and Zoom Viewpoint.  
  V: 1.3.0  
  ETA: 20170125  

- Ownership plugins production-ready: Open and Close, Save and Save As, 
  Credentials and Permissions, Lock and Unlock.  
  V: 1.4.0  
  ETA: 20170222  

- Composition plugins production-ready: Group and Ungroup, Copy, Cut, Paste
  and Duplicate.  
  V: 1.5.0  
  ETA: 20170322  

- Communication plugins production-ready: Broadcast and Notifications, 
  Conference and Private Messaging.  
  V: 1.6.0  
  ETA: 20170419  

- Polish the Command Line experience, with an excellent set of unit tests which 
  find problems across a wide range of platforms.  
  V: 1.7.0  
  ETA: 20170510  

- Plugin usage examples complete.  
  Documentation tidy and correct.  
  V: 2.0.0  
  ETA: 20170607  

- After a break, decide whether major (breaking) changes to the core or plugins 
  are needed. Or perhaps minor amends and refactoring are all that’s needed.  
  V: 2.1.0  
  ETA: 20170906  




Contributing
------------

__@todo__ Explain how developers can contribute to the Undoiverse core and plugins. 
Also explain how developers can build their own homegrown plugins, and make them
available to other Undoiverse devs. 


---

#### README draft 1, 9th September 2016
