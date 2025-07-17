// ! How NODE Works Behind The Scenes
// -----------------------------------
/**
 * ! 1. Node, V8, Libuv and C++
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * * NODE.JS ARCHITECTURE
 *      - BEHIND THE SCENES
 * 
 * >>> [NODE]
 * - node has to depend upon libraries to work properly
 *      - hence node run-time has several dependencies
 * [IMPORTANTLY..]
 *      - V8 js engines and Libuv
 * 
 * >>> [V8]
 * (uses both C++ and JS)
 * - converts js code into machine-code so that a computer can actually understand!
 * 
 * >>> [Libuv]
 * (written in C++)
 * - open-source-library => focuses on "ASYNCHRONOUS I/O"  [this gives node an access to computer's OS, FS, networking etc.,]
 * 
 * - this also implements two important features of Node
 *      - EVENT-LOOP and THREAD-POOL
 * 
 * [EVENT-LOOP]
 *      - handles easy tasks like executing call-backs and network I/O
 * 
 * [THREAD-POOL]
 *      - handles heavy work file access / file compression 
 * 
 * $ NOTE
 * - node also rely on HTTP-parser (to parse HTTP), c-ares (DNS-request), openSSL (cryptography), zLib for (compression)  
 * 
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * (Important and fundamental parts are: THREAD-POOL and EVENT-LOOP)
 * 
 * * Node Process and Threads
 * - when we use NODE on a computer... there is a NODE process running in parallel 
 * 
 * [process] 
 *      - just a program in execution on a computer
 * 
 * - in that process node.js runs inside a "SINGLE THREAD"
 * [THREAD]
 *      - sequence of instructions
 *          - a box where our code is executed inside computer's processor
 * $ IMPORTANT
 *      - node just runs in one / single thread!
 * (if we run node applications. it will run in single-thread [no matter if 10 / 10_000_000 users accessing same application at same time])
 * - [we need to take care of not blocking that code]
 * 
 * >>> HOW NODE.JS RUNS IN SINGLE THREAD!
 * +----------------------------------------------------------------------------------------+
 * |                                    NODE.JS PROCESS                                     |
 * |                    (Instance of a program in execution on a computer)                  |  
 * |+-----------------------------------------------+                                       |
 * ||   SINGLE THREAD  (Sequence of Instructions)   |                                       |
 * ||                                               |                                       |
 * ||       1. when program is initialized..        |                                       |
 * ||                       |                       |                                       |
 * ||           2. executes top-level-code          |                                       |
 * ||           (which is not inside any CB)        |                                       |
 * ||                       |                       |                                       |
 * ||    3. all the modules that a code require     |                                       |
 * ||                       |                       |                                       |
 * ||       4. registers all callback fns           |                                       |
 * ||                       |                       |                                       |
 * ||         5. finally EVENT-LOOP starts          |                                       |
 * ||             (heart of entire node)            |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||                                               |                                       |
 * ||
 * ||
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * ! 2. Processes, Threads and the Thread Pool
 * 
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */