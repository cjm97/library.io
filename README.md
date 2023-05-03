# library.io

Library.io is an application for the management of user's books'. At its core, it focuses on allowing a user to categorize books into one of three categories.
Read books - books you've finished.
To read books - books you're planning on reading, but haven't quite gotten to.
and reading books - books you're currently reading.

Additionally,  library.io allows users to give a rating for the books they've read out of 5, as well as leave a review. 

Library.io has plans for users to create more shelves past the base three categories so books can form collections of their choosing.
For example, creating a shelf for your favourite fantasy novels from each series:
TWOK - Brandon Sanderson
ASOS - GRRM
TFOTR - JRR Tolkien
Assassin's Quest - Robin Hobb


In order to use this application, you need to clone it locally. The application works assuming you have SQL/work bench installed, a web browser, and ideally VScode to launch the application.

You will need to configure the .env file in library.io\backend\.env to your respective database name/credentials.

Once the above is configured, the steps to starting the application are as follows:

1. cd to \library.io\library.io
2. npm i
3. cd to \library.io\backend
4. npm i
5. once npm has dependencies installed, to start the backend server, use 'npm start' (ensure you are in 'library.io\backend')
6. To start the front end, navigate to \library.io\library.io and use 'npm run dev'
7. You are now able to use the application, open your browser and navigate to http://localhost:5173/