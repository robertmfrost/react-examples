# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To preview the app locally, open a command-line tool and navigate to the place you want to download the app's code into. Then, type in the following commands:
1. `git clone https://github.com/robertmfrost/react-examples.git` to download the app.
2. `npm install` to download and install dependencies which the app needs in order to work.
3. `npm start` to run the app in your browser through `localhost:3000`.

## Project #1: Password Entry Library

This project attempts to explore a password entry library. Currently it is the only project on this app so it's overloaded with other features that should otherwise be provided by separate projects (such as a style guide or component library). The "extra" stuff is just to try and provide a nice interface to preview the experience through.

The first edition of the project aims to accomplish the following:
1. Has two input fields to validate the entry from the user (both inputs must match)
2. Password has a min length of 6 characters
3. Password has at least 1 uppercase character
4. Password has at least 1 lowercase character
5. Password has at least 1 number
6. Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
7. Has a submit button that will trigger validation and present success or why the password entry failed

Scoped CSS and other neat features were considered, but omitted at this time due to the small size of the app/project as a whole. Unit testing was also implemented to try and help ensure that various scenarios are working as intended. Other files likely require cleanup (such as removing the default `logo.svg` react logo image), but those can wait until a later iteration.