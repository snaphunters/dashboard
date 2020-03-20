# Snaphunt Helpdesk Demo

### `Description`
The objective of the project is to create a content management system for a new help centre module that will enable Snaphunt users to quickly find detailed explanations of the platform's features. 

Currently the Helpdesk is able to: 
- Create, Save, Modify, and Delete topics
- Create, Save, Modify, and Delete subtopics under each topic 
- Assign and Modify categories to topics 
- Attach videos and images to the content of topics (thanks to CKeditor)

Please reference the Story wall for the current progress (20 March 2020 as of this commit).

### `Stack used in Front End :`

- Express
- React
- Nodejs "12.16.1"

### `Package used:`

- CkEditor
- Semantic-ui-react
- Moment.js
- Axios

### `.env variables`
- EDITOR_HEROKU
- EDITOR_HEROKU_API_KEY
- REACT_APP_SNAPI_HEROKU_BACKEND_URL

### `Test commands`

```javascript
$ npm run test
$ npm run test:coverage
$ npm run cy:open
$ npm run cy:run
```
### `git clone`
git clone https://github.com/snaphunters/editor.git <br/>

### `npm install`

Install the packages in NodeJS environment.<br/>

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `Backend Repo`
backend repo : https://github.com/snaphunters/snapi
