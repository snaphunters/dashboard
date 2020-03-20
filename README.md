# Snaphunt Helpdesk Demo

### `Description`
The objective of the project is to create a content management system for a helpcentre module meant to help Snaphunt users quickly find detailed explanations of the platform's features. 

Currently the Helpdesk is able to: 
- Create, Save, Modify, and Delete topics
- Create, Save, Modify, and Delete subtopics under each topic 
- Assign and Modify categories to topics 
- Attach videos and images to the content of topics (thanks to CKeditor)

Please reference the Story wall for the current progress (20 March 2020 as of this commit).

### `Stack used in Back End :`

- Express
- MongoDB
- Nodejs "12.16.1"

### `Package used:`

- cors "2.8.5"
- dotenv "8.2.0"
- uuid "7.0.1"
- express "4.17.1
- mongoose "5.9.2" 

### `.env variables`
```EDITOR_HEROKU_URL```

```FRONTEND_LOCALHOST```

```MONGODB_URI```

```SNAPI_HEROKU```

```SNAPI_HEROKU_API_KEY```

### `Test commands`

```$ npm run test```

```$ npm run test:coverage```

### `git clone`
git clone https://github.com/snaphunters/snapi.git <br/>

### `npm install`

Install the packages above in NodeJS.<br/>

### `npm start`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see lint errors in the console.

### `Frontend Repo`
[https://github.com/snaphunters/editor](https://github.com/snaphunters/editor)
