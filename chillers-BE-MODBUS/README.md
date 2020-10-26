# Modbus-server
The server on that listen on port 3100
The server responsible to read the collections from MongoDB and get the registered chillers' configurations out of it.
The server should connect each chiller and save the latest data to a local MongoDB.

## Configurations
Please edit ./src/db/database in case you want to change the DB configurations and set ENV file.

## How to run
Use `npm start` to start the server, and verify that there's nothing else running on port 3100.

## About the process
The server will connect each of the registered chillers one by one and it will get the relevant data out of it.
After getting the data, the server will save it to the related collection in the database based on the chiller's ID.

---

## MongoDB Atlas Account Information
### Gmail
> Email: chillers.db.rw@gmail.com

> Password: **chillers12321**

### How to connect
connect to Atlas-MongoDB with this google account
https://cloud.mongodb.com/v2/5f5dbcf00d7e2200b26ece87#metrics/replicaSet/5f5dbdb3c3ea437e67300a09/explorer/chillers

### How to connect H.i.T's remote linux server
Open your CMD and enter the following `ssh -p 1194 chillers@192.114.5.159`
After that, the server will ask you for a pwd, please enter `#Chill`.
Now, you're connected to the remote server, to enter the directory of the modbus, please `cd modbus` and use the `npm start` command as written above.

---

## License


- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://www.tomerzaidler.com" target="_blank">Tomer Zaidler</a> & <a href="https://rledev.com/" target="_blank">Raz Levy</a>..
