
# Users-server

> API server on that listen on port 3200

> user system using mongoDB and authentication

---

## Table of Contents (Optional)

> If your `README` has a lot of info, section headers might be nice.

- [Installation](#installation)
- [API](#api)
- [Contributing](#contributing)
- [Team](#team)
- [Support](#support)
- [License](#license)


---

## API call Example 

```javascript
// api call example

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`createUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};
```

---

## Installation

- install node.js

### Clone

- Clone this repo to your local machine

### Setup

- one line command setup

> now install npm

```shell
$ npm install
```

---
## API
> base url is http://localhost:3200/api/1
- /create -> **POST request**
- /get -> **GET request**
- /delete -> **DELETE request**
- /login -> **POST request**
- /edit -> **PATCH request**
- /get/all -> **GET request**

> How to add another route?
- Create another file in the api folder
- Import new file to the routes.js
- Add a route with the imported file example:
```javascript
router.use('/new-route', require('./api/new-file'));
```
---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

### Step 2

- **HACK AWAY!** 🔨🔨🔨


---


## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
