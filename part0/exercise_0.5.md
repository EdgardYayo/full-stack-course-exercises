# Exercise 0.5: Single page app diagram

sequenceDiagram
    participant browser
    participant server

    browser-->>server: GET  https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser-->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser-->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of the browser: this second fetch to gps.js is due to a chrome extension

    browser-->>server: GET chrome-extension://fgddmllnllkalaagkghckoinaemmogpe/scripts/content/gps.js
    activate server
    server-->>browser: the JavaScript file for the extension
    deactivate server

    browser-->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Escribiendo algo...", "date": "2024-20-07" }, ... ]
    deactivate server