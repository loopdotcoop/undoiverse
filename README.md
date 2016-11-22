Undoiverse
==========



--------
Contents
--------

- [Introduction](#introduction)
- [How it Works](#how-it-works)
- [What it Isn’t](#what-it-isnt)
- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [Command Line](#command-line)
- [Changelog and Roadmap](#changelog-and-roadmap)
- [Contributing](#contributing)



------------
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

[Undoiverse⤴](http://undoiverse.loop.coop) is an open source server-side
JavaScript module. It allows hundreds of users to create, collaborate and
communicate in a shared ‘free roaming’ 3D environment. Although you can build
[multiplayer VR games⤴](https://goo.gl/VJgGdZ) with it, Undoiverse is really
intended for multiuser creative VR experiences - the features it provides will
be very familiar to anyone who’s used creative applications like Photoshop,
GarageBand, PowerPoint or AutoCAD:

- Copy and Paste
- Undo and Redo
- Group and Ungroup
- Lock and Unlock
- Save and Save As
- …and [so on](#the-standard-plugins)


### For Example

Say you want to develop a gamified learning app for young engineers, loosely
based on [Scrapheap Challenge / Junkyard Wars⤴](https://goo.gl/zNwChk). A dozen
mechanics in two teams scavenge a giant pile of rusty parts, and race to
assemble a working car.

First, players sign in to your app and customise their avatars. Then your app
randomly generates a few thousand car parts and scatters them around the virtual
junkyard. Next your app initialises a new Undoiverse instance and tells it a
little about each player, avatar and car part.

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
an HTML5 web page. In fact your players can all be using different frontend
technologies at the same time, linked together via the same server.


### Project Goals

[__@todo__ Discuss]


### About These Docs

This documentation assumes that you are a developer with some experience of 3D
and JavaScript. You might be starting a new project from scratch, or you might
have a single-user creative app running already that you’d like to make
multiuser, and add a Git-based undo/redo system to.

[__@todo__ Write a conclusion to the Introduction. Explain how the docs are
split into various READMEs, and their current status is. Suggest where to go for
more info on Node, 3D, JavaScript, hosting, writing client-side apps, etc.]



------------
How It Works
------------

At its most basic level, Undoiverse is designed to __manage the interactions
between Clients, Entities and Locations in a free roaming multiuser creative
application.__ By concentrating on one job within a particular kind of app,
Undoiverse can be kept lean and efficient.

Undoiverse has a loosely coupled, modular architecture. Code is organised into
groups of [plugins⤴](https://goo.gl/zDyhwb), which talk to each other via [events⤴](https://goo.gl/QvtIvZ). This helps keep code focused, maintainable,
and easy to test. It also means that your app can add features with the minimum
of fuss.


### The Undoiverse Class

The Undoiverse Class is defined in ‘undoiverse.js’, and provides two main
services:

1. __Initialisation__ — When you call `new Undoiverse()` to create an instance,
   the `constructor()` processes your configuration object, activates the [Core Plugins](#the-core-plugins) and activates any other plugins that you specify.

2. __Communication__ — As your app runs, the instance coordinates messages sent
   between your app, your users, and whatever Undoiverse Plugins you activated.

The [Basic Usage](#basic-usage) and [Advanced Usage](#advanced-usage) sections
below cover most of the Undoiverse Class’s API. The ‘undoiverse.js’ file is well
commented and fairly easy to understand.


### The Core Plugins

The Core Plugins are Client, Entity and Location. Undoiverse can’t run without
them, so it automatically activates them during initialisation. For full API
and documentation, see [plugins/core/README.md](
https://github.com/loopdotcoop/undoiverse/tree/master/plugins/core).

- __Client__ — Your app’s client-side code could be JavaScript running in a
  browser, C# in a Unity app, or Python compiled to an ‘.exe’ on a PC.
  Devices running this code talk to your app’s Undoiverse instance (which is
  running on a server), usually via [WebSockets⤴](goo.gl/xe3ER9). The Client
  Plugin keeps a record of these Clients while they are connected, and it also
  keeps track as they shift their attention between Locations.

- __Entity__ — In the [Scrapheap Challenge example](#for-example) above, the
  scene contains avatars (which each belong to a Client), car parts (of various
  kinds) and mechanic’s tools (for cutting and joining car parts). The Entity
  Plugin doesn’t differentiate between any of these kinds of things — it just
  keeps track of Entities as they’re created, moved from Location to Location,
  edited, joined, split apart and deleted.

- __Location__ — During initialisation, your configuration object decides how
  many Locations your app will need, typically between 50 and 1000. The Location
  Plugin doesn’t care whether these Locations are arranged in a grid, or nested
  inside each other, or whether they represent places in the real world or not.
  Each Location is just a simple list which can contain Clients and Entities.

At any one time, your app might have 500 active Clients and a million current
Entities, spread across a thousand Locations. Assuming your app is left
permanently running, it might deal with 100,000 Client connections and a couple
of billion Entities over the course of a year.

[__@todo__ Describe how Client/Entity/Location work together to give you the
minimum you need for a collaborative creative 3D app. Mention that Undoiverse
can work with only these three activated, and describe the experience the
user would have in an app like that.]


### The Standard Plugins

The Standard Plugins are all optional. They’re organised into seven groups:  
[__@todo__ Explain how the Scrapheap Challenge game would use each of them.]

1. __Corral__ — [__@todo__ Describe]

   - Alias, for Entities which share some attributes with other Entities
   - Clipboard, for cut, copy and paste
   - Clone, for Entities which start with attributes copied from other Entities
   - Group, (and ungroup) for using an Entity to contain other Entities
   - Repeat, to run an earlier Entity operation a second time
   - Unite, (and sever) for combining two or more Entities into a single Entity

2. __Develop__ — [__@todo__ Describe]

   - Alert, a channel for auto-sending messages to developers and admins
   - Benchmark, for measuring, recording, analysing and improving performance
   - Log, various kinds of text output
   - Reflect, to help developers understand current app state

3. __History__ — This group of plugins depend on a Git repo (local, remote or
   GitHub) which records all events in the virtual environment. Once Git is set
   up in your ‘Scrapheap Challenge’ app, everything that each mechanic does is
   permanently archived. This allows you enable the other History group plugins:

   - Branch, for forking and Merging (creating and combining Git branches)
   - Git, to use a local or remote Git repo
   - GitHub, to use a private or public GitHub repo
   - Scrub, for rewind and playback of history-state
   - Traverse, for undo, redo, revert or jumping to arbitrary points in history

   So you can use a GitHub repo to rewind and replay the process of building a
   car, or allow mechanics to undo their mistakes.

4. __Message__ — [__@todo__ Describe]

   - Ask, allows the app to retrieve data from Clients
   - Broadcast, for sending messages to all Clients
   - Conference, to let two or more Clients communicate with each other
   - Notify, for sending messages to one Client

5. __Own__ — [__@todo__ Describe]

   - Allow, for defining credentials and permissions
   - Hide, (and show) to prevent an Entity from being seen
   - Lock, (and unlock) to prevent an Entity from being modified
   - Open, (and close) to open an Entity in read-only or read/write mode
   - Save, and save-as, to create named a snapshot of Entity state

6. __Persist__ — Various ways of storing Undoiverse’s current state, using the
   local file system, memory, databases, or remote services.  

   - Mongo, for the [MongoDB](https://www.mongodb.com/) document store
   - Csv, for persisting to a set of comma-separated-value files
   - Keyval, for key-value stores like [Redis](http://redis.io/)
   - Memory, for persisting to a simple in-memory JavaScript object
   - Sql, for relational DBMS’s like [MySQL](https://mysql.com/)

7. __Query__ — Some kinds of simple search and filter operations are possible
   with just the Core Plugins activated. But the Query group of plugins really
   come into their own when the History and Persist groups are enabled.

   - Count, to count the number of Elements which match the search terms
   - Find, to list Elements which match the search terms
   - Stats, for analysis of the current or historical data set
   - Validator, for diagnosing problems with the data set
   - Watcher, for subscribing to changes to the data set

Full API documentation for the Standard Plugins can be found in their respective
directories:

1. [plugins/corral/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/corral)
2. [plugins/develop/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/develop)
3. [plugins/history/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/history)
4. [plugins/message/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/message)
5. [plugins/own/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/own)
6. [plugins/persist/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/persist)
7. [plugins/query/README.md](
   https://github.com/loopdotcoop/undoiverse/tree/master/plugins/query)


### Boilerplate Plugins

[__@todo__ Give these a quick mention]


### Community Plugins

We invite you to contribute your own plugins to the community.  
[__@todo__ Discuss this in more detail]

We intend to cease all major API updates to the Undoiverse Class and the Core
and Standard Plugins by the end of 2017 — they’ll only be updated for
compatibility and performance after that. So progress in 2018 and beyond will be
through Community Plugins.



-------------
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

[__@todo__ Discuss CDN vs keeping assets in the same Git repo as the History
plugins use. Discuss using payload attributes to modify static assets. Discuss
why attributes should only represent vertices for very simple geometries]



-------------
Project Goals
-------------

[__@todo__ Write the Project Goals section.]



---------------
Getting Started
---------------


### What You’ll Need


### Installing From NPM


### Installing the Command Line Tool


### Running on your local machine


### Running on a remote server

[__@todo__ Describe how to monitor and control a Node process running an
Undoiverse instance on a remote server, eg via SSH. Also, an Undoiverse instance
running in a browser, via the JavaScript console.]




-----------
Basic Usage
-----------


### Instantiation


### Events


### Properties


### Methods


### Exceptions


### Browser Usage

Undoiverse is optimised to run under Node on a server, but it can also be made
to run in a browser. [__@todo__ Discuss]



--------------
Advanced Usage
--------------


### Connecting to a GitHub Repo


### Multi-Op Transactions


### Profiling and Benchmarking


### Optimising Performance



------------
Command Line
------------

### Development Commands


### Deployment Commands


#### Deploy to Your Own Server


#### Deploy to a Docker Hosting Service

[__@todo__ link to specific instructions for OpenShift, Google Container Engine,
AWS, Azure, etc]


#### Deploy to the Free Undoiverse Demo-Server


#### Deploy to the Commercial Undoiverse Server



---------------------
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

- Change README.md from ‘draft’ to ‘live’ status. This means that the basic API
  and architecture, and the project goals and scope have been agreed by the team
  and set in stone.  
  V: 0.1.0  
  ETA: 20161102  
  ATA: 20161103

- Initial directory structure in place.  
  Functional Undoiverse Class and Core Plugins, passing low-level unit tests.  
  Basic test system for the Undoiverse project in place (we’re getting on fine
  without any build or deploy systems, so far).  
  Project page at http://undoiverse.loop.coop/ just duplicates this README.  
  V: 0.2.0  
  ETA: 20161109  
  ATA: 20161110

- ‘uu.js’ has `box()` (unit tested) for rendering ASCII boxes.  
  `browse()` can return an ASCII box in ‘plugins/core/client’ and ‘...entity’.  
  V: 0.2.2  
  ETA: 20161123  
  ATA: 20161122  


### Roadmap

- `browse()` can return an ASCII box in ‘plugins/core/location’.  
  ‘plugins/develop/log’ able to output to console and/or directly to file.  
  ‘plugins/develop/log’ formats for raw log-lines, ASCII rendered Locations,
  lists of Clients and Entities, and a summary of current state.  
  V: 0.3.0  
  ETA: 20161130  

- Stronger Undoiverse Class and Core Plugins, passing a decent set of unit
  tests. Unit tests now test against the output of ‘plugins/develop/log’.  
  V: 0.4.0  
  ETA: 20161105  

- Core Usage Examples begun - between them, they should thoroughly cover all
  Undoiverse Class and Core Plugin code.  
  ‘plugins/message/ask’ production-ready.  
  V: 0.5.0  
  ETA: 20161209  

- Undoiverse Class and Core Plugins production-ready, thoroughly tested and
  reasonably well optimised.  
  Remaining Develop Plugins production-ready: Alert, Benchmark, Reflect.  
  Core Usage Examples well tested on a variety of UAs/platforms.  
  V: 0.6.0  
  ETA: 20161214  

- Command Line basically functional, passing a fairly good set of unit tests.  
  Some Boilerplate Plugins production-ready.  
  V: 0.7.0  
  ETA: 20161221  

- Documentation tidy and correct. Complete for Undoiverse Class, Core Plugins,
  ‘plugins/develop/log’ and Core Usage Examples. Incomplete (with ‘@todos’)
  for Command Line, the remaining Standard Plugins, Community Plugins.  
  http://undoiverse.loop.coop/ is responsive and properly styled, with a logo.  
  V: 1.0.0  
  ETA: 20170111  

- ‘plugins/history/git’ and ‘plugins/persist/memory’ production-ready.  
  V: 1.1.0  
  ETA: 20170125  

- Remaining History Plugins production-ready: Github, Traverse, Scrub, Branch.  
  V: 1.2.0  
  ETA: 20170208  

- Remaining Persist Plugins production-ready: Mongo, Csv, Keyval, Sql.  
  V: 1.2.0  
  ETA: 20170220  

- Query Plugins production-ready: Count, Find, Stats, Validator, Watcher.  
  V: 1.3.0  
  ETA: 20170301  

- Own Plugins production-ready: Allow, Hide, Lock, Open, Save.  
  V: 1.4.0  
  ETA: 20170322  

- Corral Plugins production-ready: Alias, Clipboard, Clone, Group, Repeat,
  Unite.  
  V: 1.5.0  
  ETA: 20170412  

- Remaining Message Plugins production-ready: Broadcast, Conference, Notify.  
  V: 1.6.0  
  ETA: 20170503  

- Polish the Command Line experience, with an excellent set of unit tests which
  find problems across a wide range of platforms.  
  V: 1.7.0  
  ETA: 20170517  

- Plugin Usage Examples complete.  
  Remaining Boilerplate Plugins production-ready.  
  Documentation tidy and correct.  
  V: 2.0.0  
  ETA: 20170607  

- Arrive at a conclusion whether major (breaking) API changes are needed to the
  Undoiverse Class and the Core and Standard Plugins. Ideally not, but if they
  _are_ needed, let’s aim to complete them all by the end of 2017. After that,
  the only modifications to the Undoiverse Class and the Core and Standard
  Plugins should be refactoring for compatibility and performance.  
  Progress in 2018 and beyond will be made through Community Plugins, better
  examples, better documentation, and so on.  
  V: 2.1.0  
  ETA: 20170906  



------------
Contributing
------------

Undoiverse is an open source project by digital tinkerers
[Loop.Coop⤴](http://loop.coop/).

[__@todo__ Explain how developers can contribute to Undoiverse Class and the
Core and Standard Plugins. Also explain how developers can build their own
Community Plugins, and make them available to other Undoiverse devs.]

[__@todo__ Explain code-style — ES6 for Node.js, with minimal `{}`’s and `;`s.]


---

#### README last modified 22nd November 2016
