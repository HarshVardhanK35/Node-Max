// ! Introduction to Back-End Web-Development
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/**
 * ! 1. An Overview of How the Web Works
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * ? what happens each-time a user enters a URL into a browser === what happens when users request data from an API ?
 * 
 * >>> req-res model / client-server architecture
 * #1 [STEP]
 * >>> DOMAIN and DNS
 *                  + --------REQ-------- =>
 *      [CLIENT]                                  [SERVER]
 *      /           <= --------RES-------- +
 * enters 
 *  URL +---=> "https://google.com/maps"       + --- =>     DNS-lookup [Domain-Name-Server]
 *              /         |         \                                   \
 *          PROTOCOL      |         RESOURCE                            conversion
 *            /      DOMAIN NAME                                                \
 *  (HTTP or HTTPS)                                                     https://216.58.211.206:443
 *                                                                      /           |               \
 *                                                              PROTOCOL        IP-ADDRESS          PORT-NUMBER [def: 443-HTTPS & 80-HTTP]
 * [DOMAIN: google.com]
 *      - this is not the real address of server that we are trying to access
 * - converting domain name into real-address of server is done using "DNS"     
 *                      [Converted to: ]
 * 
 * - browser makes a request to DNS and this DNS match the web-address that we typed inside a browser to server's real IP address!
 *      - this happens through ISP [internet service provider]
 * 
 * #2 [STEP]
 * >>> TCP/IP CONNECTION
 *      [CLIENT] +--------- TCP/IP Socket Connection ---------+ [SERVER]
 * 
 * [TCP/IP connection]
 *      - with this CLIENT and SERVER are connected!
 * - this connection is kept alive.. until all files are transferred
 * 
 * ? what are "TCP" and "IP"
 *      - TCP:  Transmission Control Protocol
 *      - IP:   Internet Protocol
 * - together are communication protocols.. define how data travels across web
 *      - these are internet's basic control systems.. these set rules on how data moves on internet!
 * 
 * #3 [STEP]
 * >>> HTTP REQUEST     
 * 
 *      [CLIENT] +--------- HTTP Req --------- =>  [SERVER]
 * 
 * [HTTP]: // - Hyper Text Transfer Protocol
 *      - this is also a communication protocol
 * 
 * >>> Communication Protocol: 
 *      - system of rules which allows two or more parties to communicate!
 * - as HTTP allows clients and web-servers to communicate
 * [by sending req and res messages from client to server and vice-versa]
 * 
 * ? [HTTP methods]
 *      - GET       : request data 
 *      - POST      : sending data 
 *      - PUT/PATCH : modify data
 * 
 * [HTTP REQ Message]
 * --------------
GET /maps HTTP/1.1          | => start line >>> HTTP method + request target + HTTP version

Host: www.google.com        |
User-Agent: Mozilla/5.0     | => HTTP req headers: meta info that we send about the req
Accept-Language: en-us      |

<BODY>                      | => REQUEST-BODY: to send data to server [only when POST req.] 
 * 
 * 
 * >>> diff between HTTP and HTTPS
 * - HTTPS is encrypted using TLS or SSL certificates [which means more secure connection]
 * 
 * #4 [STEP]
 * >>> HTTP RESPONSE 
 * 
 *      [CLIENT] <= -------- HTTP Req ---------+  [SERVER]
 *      
 * [HTTP RES message]
 * ------------------
HTTP/1.1 200 OK             | => start-line: HTTP version + status code + status message

Date: today's date          |
Content-Type: text/html     | => HTTP response Headers: info about response 
Transfer-Encoding: chunked  |

<BODY>                      | => response body: JSON-data that will be coming from an API
 * 
 * 
 * #5 [step]
 * >>> Initial HTML file 
 *      - index.html will be initially loaded!
 *                      |
 *      - scanned for assets: JS, CSS assets
 *                      |
 *      - PROCESS is repeated for each file
 * 
 * $ NOTE:
 * - for each file a new request and response cycle will be happened
 * - but amount of req and res cycles are limited!
 * [otherwise connection would sow down]
 * 
 * #6 [step]
 * >>> FINAL RENDER
 * - when every file has been arrived.. then final output page will be rendered
 * 
 * 
 * * TCP / IP 
 * [TCP]
 *      - these are communication PROTOCOLS which define how data travels across the web!
 *      - breaks down responses into thousands of SMALL CHUNKS called "PACKETS" [before they are sent!]
 *      - then once they reach destination.. TCP will reassemble all the "PACKETS"
 * [IP]
 *      - send and route all PACKETS through the INTERNET!
 *      - ensures they reach to destination using IP addresses on each packets
 *     
 * 
 * ! 2. HTTP in Action
 * -=-=-=-=-=-=-=-=-=-=
 * 
 * 
 * ! 3. Front-End vs. Back-End Web Development
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * * SERVER
 *      - server is a COMPUTER which is connected to INTERNET
 * 
 * - which stores website's files [HTML, CSS, images..]
 * - runs an HTTP server [capable of understanding URLs, req, and also delivers responses]
 * 
 * [STATIC website]
 * [HTTP-server]
 *      - acts as bridge between CLIENT and SERVER
 * - which helps in BROWSER and SERVER to communicate [using requests and responses] 
 * 
 * [DYNAMIC web-app]
 * [SERVER]
 *      - dynamic-server where an app runs and an HTTP server and files which are taking to each other
 * - also need a database [used to store data]
 * 
 * ! 3. Static vs Dynamic vs API
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 
 * >>> [static]
 *      - when dev uploads final ready to be served files of website onto a web-server
 *      - these files consists of HTML, CSS, JS, images and more => these are exact files that are sent to browser! [when website has requested]
 *      - browser take these files and render them as they are!
 *          - therefore no sever running in back and just static webpages are served
 * 
 * >>> [dynamic]
 *      - contains a database and an application [node-app] running [which fetches data]                                    |
 *      - each time browser requests a page.. then that page is built using HTML, CSS and JS [with pre-defined templates]   | => this whole process is "SERVER-SIDE-RENDERING"
 *      - then this page will be sent to browser!
 * 
 * [SERVER-SIDE-RENDERING]
 *      - this is why it is called "DYNAMIC" >>> website can change according to the content that is in the database!
 * 
 *                   SERVER-SIDE                                +---------- =>      CLIENT-SIDE
 * DATABASE => GETS-DATA     => Build a website  =>  HTML + CSS               BROWSER
 *                 |                 |                 + JS     <= ----------+
 *            using an app     using a template             \
 *                                                    this is built on server-side
 *                                                              and called // => server-side-rendering !
 * >>> [APIs]
 * [Application Programming Interface]
 *      - database => an App [which fetches data from database] - (only when user makes a request)
 *      - similar to dynamic website - (but diff..) => we send data to browser [in JSON format] (but not entire website [does not contain HTML, CSS, JS..])
 * 
 * [API based web-applications]
 * - these are built in 2 steps..
 * 
 *      (PART-1)                        (PART-2)
 *      - BUILDING an API + CONSUMING that API
 *              |                             \ 
 *  database + app => JSON                     + --------------- +     
 *              |          \                                     |
 *        fetches data      sent to the                 assembling website: [plugs data that received into templates..  
 *      from a database         client-side                                     ..using some frameworks like: "react" / "angular"]
 * 
 * [definition]
 * - a piece of software that can be used by another piece of software 
 *      - which allow applications to TALK to each other 
 * 
 * [therefore]
 *      - it is easier to just build an API and let front-end people to build the client-side
 * - and node is best tool to build an API and also dynamic server-side rendering websites
 * 
 * * [IN THIS COURSE...]
 *      we build both // => "server-side-rendering" and "BUILD-an-API"
 * 
 * >>> [in next lecture]
 *      => How NODE works: Behind The Scenes
 */