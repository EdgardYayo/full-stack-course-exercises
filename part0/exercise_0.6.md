# Exercise 0.6: New note in Single page app diagram

sequenceDiagram
    participant browser
    participant server

    browser-->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created or 200 OK or 500 Internal server error
    deactivate server

    Note right of browser: Since it is a single page application, fetching all the data back is no longer necessary