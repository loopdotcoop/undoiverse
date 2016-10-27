Undoiverse
==========




Contents
--------

- [Introduction](#introduction)
- [How it Works](#how-it-works)
- [What it Isn’t](#what-it-isnt)
- [Project Goals](#project-goals)
- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [Plugin Reference](#plugin-reference)
- [Advanced Usage](#advanced-usage)
- [Command Line](#command-line)
- [About Loop.Coop](#about-loopcoop)
- [Changelog and Roadmap](#changelog-and-roadmap)
- [Contributing](#contributing)




Introduction
------------

The dream of virtual worlds has fired our collective imagination for a long
while. A [metaverse⤴](https://en.wikipedia.org/wiki/Metaverse) where people can
meet, learn, make things and share ideas. Recent web technologies (WebGL, Web
Audio, WebSockets, WebVR) provide the foundations for immersive 3D experiences
on the web. At the same time, development platforms like Unity and Unreal make
it easy to build games that work on mobile, desktop, VR/AR and consoles.

But none of these technologies and platforms address the server-side needs of
_multiuser creative applications_.

[Undoiverse](http://undoiverse.loop.coop) is an open source server-side
JavaScript module. It allows hundreds of users to create, collaborate and
communicate in a shared ‘free roaming’ 3D environment. Although you can build
[multiplayer VR games⤴](https://goo.gl/VJgGdZ) with it, Undoiverse is really
intended for multiuser creative VR experiences - the features it provides will
be very familiar to anyone who’s used creative applications like Photoshop,
GarageBand, PowerPoint or SketchUp:

- Copy and Paste
- Undo and Redo
- Group and Ungroup
- Lock and Unlock
- Save and Save As
- …and [so on](#vanilla-plugins)


#### For Example

Say you want to develop a gamified learning app for young engineers, loosely
based on [Scrapheap Challenge / Junkyard Wars⤴](https://goo.gl/zNwChk). A dozen
mechanics in two teams scavenge a giant pile of rusty parts, and race to
assemble a working car.

First, players sign in to your app and customise their avatars. Then your app
randomly generates a few thousand car parts and scatters them around the virtual
junkyard. Next your app creates a new Undoiverse instance and tells it a little
about each player, avatar and car part.

The game starts, and Undoiverse tracks the locations and attributes of the car
parts as players collect them, carry them, chop them up and weld them together.

Undoiverse’s main task is to keep players’ devices constantly updated with the
current state of car parts and avatars in their vicinity. But you can install
Plugins to extend Undoiverse’s capabilities, letting players send messages to
each other, undo their mistakes, or search the scrapheap for a particular kind
of steering wheel.

Just to be clear: Undoiverse only runs on the server, so it can’t help you with
lighting, physics, 3D rendering or the user interface — your frontend code needs
to do all that. Your frontend could be an iPhone app, a PlayStation 4 VR game or
an HTML5 web app. In fact your players can all be using different frontend
technologies at the same time, linked together via the same server.

[__@todo__ Write a conclusion to the Introduction. Maybe explain what this
README’s current status is, where to go for more info]




How It Works
------------

From here on we’ll assume that you are a developer with some experience of 3D
and JavaScript. You might be starting a new project from scratch, or you might
have a single-user creative app running already that you’d like to make
multiuser, and add a Git-based undo/redo system to.


### The Fundamentals

At its most basic level, Undoiverse is designed to __manage the interactions
between Clients, Entities and Locations in a free roaming multiuser creative
application.__ By concentrating on one job within a particular kind of app,
Undoiverse can be kept lean and efficient.

[__@todo__ Describe how Client/Entity/Location work together to give you the
minimum you need for a collaborative creative 3D app. Mention that Undoiverse
will work with only these three installed, and describe the experience the
user would have in an app like that.]

#### What is a ‘Client’?

#### What is an ‘Entity’?

#### What is a ‘Location’?


### Keeping It Loosely Coupled

Undoiverse has a loosely coupled, modular architecture. Code is organised into
groups of [plugins⤴](https://goo.gl/zDyhwb), which talk to each other via
[hooks⤴](https://goo.gl/wPStU7) and [events⤴](https://goo.gl/QvtIvZ). This
helps keep code focused, maintainable, and easy to test. It also means that your
app can add or remove features with the minimum of fuss.


#### The ‘undoiverse.js’ File

The ‘undoiverse.js’ file provides three main services:

1. __Initialisation and Configuration__ — [__@todo__ Describe]
2. __Plugin Management__ — Allows functionality to be installed as the app
   starts up, or even while it’s running [__@todo__ Can we also list and remove
   Plugins? Can we change their config while it’s running?]
3. __Communication Hub__ — Coordinates the messages sent between your app, your
   users, and whatever Undoiverse Plugins you have installed


#### The Core Plugins

The Core Plugins are [Client](#what-is-a-client), [Entity](#what-is-an-entity)
and [Location](#what-is-a-location). Undoiverse can’t run without them, so it
automatically installs them during initialisation.


#### The Vanilla Plugins

The Vanilla Plugins are all optional. [__@todo__ Introduce plugins section-by-
section, explaining how the Scrapheap Challenge game would use each of them.]

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
Undoiverse permanently records everything that each mechanic does. This allows
you enable other history-based plugins like:

- Rewind and Playback
- Undo and Redo
- Fork and Merge
- Historical Analysis

So you can use a GitHub repo to rewind and replay the process of building a car,
or allow mechanics to undo their mistakes.


#### The Community Plugins

[__@todo__ Describe Undoiverse’s plugin architecture. We intend to cease all
major API updates to ‘undoiverse.js’ and the Core and Vanilla Plugins by the end
of 2017 - they’ll only be updated for compatibility and performance after that.
So progress in 2018 and beyond will be made through Community Plugins.]

We invite you to contribute your own plugins to the community.  
[__@todo__ Discuss this in more detail. Need a boilerplate Plugin]




What it Isn’t
-------------

[__@todo__ Introduce this - common misconceptions]


### AI

[__@todo__ How an app dev could treat their own AI bots as regular users]


### Collisions and Physics

[__@todo__ Discuss Undoiverse’s basic understanding of collisions, which is
limited to intersecting Locations. Your app might be able to rule out collisions
between Entities which do not share any locations]


### Models, Textures and Audio

[__@todo__ Discuss CDN, vs keeping assets in the same Git repo as the History
Plugin uses. Discuss using payload attributes to modify static assets. Discuss
why attributes should only represent vertices for very simple geometries]




Project Goals
-------------

[__@todo__ Write the Project Goals section.]




Getting Started
---------------


### What You’ll Need


### Installing From NPM


### Installing the Command Line Tool




Basic Usage
-----------


### Instantiation

Usually we think about a Node process running a single Undoiverse instance. But
two or more Undoiverse instances can happily coexist:  
```js
const lumpySpace = require('undoiverse')();
const candyKingdom = require('undoiverse')();
```

Above, we’ve instantiated without passing any configuration. That’s the same as
instantiating with the following defaults:  
```js
const lumpySpace = require('undoiverse')({
    //@todo add a listing of all default config
});
```


### Events


### Properties


### Methods


### Exceptions


### Browser Usage

Undoiverse is optimised to run under Node on a server, but it can also be made
to run in a browser. [__@todo__ Discuss]




Plugin Reference
----------------


### Core Plugin API

#### Client

#### Entity

#### Location


### Persistence Plugin API

#### File System

#### Database

#### Meteor Integration


### History Plugin API

#### Git Archive

#### Rewind and Playback

#### Undo and Redo

#### Fork and Merge

#### Historical Analysis


### Query Plugin API

#### Search and Filter

#### Move and Zoom Viewpoint


### Ownership Plugin API

#### Open and Close

#### Save and Save As

#### Credentials and Permissions

#### Lock and Unlock


### Composition Plugin API

#### Group and Ungroup

#### Copy, Cut, Paste and Duplicate


### Communication Plugin API

#### Broadcast and Notifications

#### Conference and Private Messaging




Advanced Usage
--------------


### Connecting to a GitHub Repo


### Multi-Op Transactions


### Profiling and Benchmarking


### Optimising Performance




Command Line
------------

[__@todo__ Describe how to monitor and control a Node process running an
Undoiverse instance on a remote server, eg via SSH. Also, an Undoiverse instance
running in a browser, via the JavaScript console.]


### Deployment


#### Deploy to Your Own Server


#### Deploy to a Docker Hosting Service

[__@todo__ link to specific instructions for OpenShift, Google Container Engine,
AWS, Azure, etc]


#### Deploy to the Free Undoiverse Demo-Server


#### Deploy to the Commercial Undoiverse Server




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

- README.md second draft.  
  V: 0.0.2  
  ETA: 20160914  
  ATA: 20160914

- README.md third draft.  
  V: 0.0.3  
  ETA: 20161026
  ATA: 20161026


### Roadmap

- Change README.md from ‘draft’ to ‘live’ status. This means that the project
  goals, scope and API have been agreed by the team and set in stone.  
  V: 0.1.0  
  ETA: 20161102  

- Functional ‘undoiverse.js’ and Core Plugins, passing low-level unit tests.  
  Test, build and deploy systems in place.  
  Project page at http://undoiverse.loop.coop/ just duplicates this README.  
  V: 0.2.0  
  ETA: 20161109  

- ‘vanilla/log.js’ able to output to console and/or directly to file.  
  ‘vanilla/log.js’ formats for raw log-lines, ASCII rendered Locations, lists of
  Clients and Entities, and a summary of current state.  
  V: 0.3.0  
  ETA: 20161116  

- Stronger ‘undoiverse.js’ and Core Plugins, passing a decent set of unit tests.
  Unit tests can now test against the output of ‘vanilla/log.js’.  
  V: 0.4.0  
  ETA: 20161123  

- Core Usage Examples begun - between them, they should thoroughly cover all
  ‘undoiverse.js’ and core plugin code.  
  V: 0.5.0  
  ETA: 20161130  

- ‘undoiverse.js’ and Core Plugins production-ready, thoroughly tested and
  reasonably well optimised.  
  Core Usage Examples well tested on a variety of UAs/platforms.  
  V: 0.6.0  
  ETA: 20161214  

- Command Line basically functional, passing a fairly good set of unit tests.  
  V: 0.7.0  
  ETA: 20161221  

- Documentation tidy and correct. Complete for ‘undoiverse.js’, Core Plugins,
  ‘vanilla/log.js’ and Core Usage Examples. Incomplete (with ‘todos’) for
  Command Line, the planned ‘vanilla/....js’ Plugins, Community Plugins.  
  http://undoiverse.loop.coop/ is responsive and properly styled, with a logo.  
  V: 1.0.0  
  ETA: 20170111  

- ‘Git Archive’ history plugin production-ready.  
  V: 1.1.0  
  ETA: 20170125  

- Other history plugins production-ready: Rewind and Playback, Undo and Redo,
  Fork and Merge, Historical Analysis.  
  V: 1.2.0  
  ETA: 20170208  

- Query plugins production-ready: Search and Filter, Move and Zoom Viewpoint.  
  V: 1.3.0  
  ETA: 20170301  

- Ownership plugins production-ready: Open and Close, Save and Save As,
  Credentials and Permissions, Lock and Unlock.  
  V: 1.4.0  
  ETA: 20170322  

- Composition plugins production-ready: Group and Ungroup, Copy, Cut, Paste
  and Duplicate.  
  V: 1.5.0  
  ETA: 20170412  

- Communication plugins production-ready: Broadcast and Notifications,
  Conference and Private Messaging.  
  V: 1.6.0  
  ETA: 20170503  

- Polish the Command Line experience, with an excellent set of unit tests which
  find problems across a wide range of platforms.  
  V: 1.7.0  
  ETA: 20170517  

- Plugin usage examples complete.  
  Documentation tidy and correct.  
  V: 2.0.0  
  ETA: 20170607  

- Arrive at a conclusion whether major (breaking) API changes are needed to
  ‘undoiverse.js’ and the Core and Vanilla Plugins. Ideally not, but if they
  _are_ needed, let’s aim to complete them all by the end of 2017. After that,
  the only modifications to ‘undoiverse.js’ and the Core and Vanilla Plugins
  should be refactoring for compatibility and performance.  
  Progress in 2018 and beyond will be made through Community Plugins, better
  examples, better documentation, and so on.  
  V: 2.1.0  
  ETA: 20170906  




Contributing
------------

[__@todo__ Explain how developers can contribute to ‘undoiverse.js’ and the Core
and Vanilla Plugins. Also explain how developers can build their own Community
Plugins, and make them available to other Undoiverse devs.]


---

#### README draft 3, 26th September 2016
