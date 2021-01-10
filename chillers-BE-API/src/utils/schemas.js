const mongoose = require('mongoose');
const fahrenheitToCelcius = require('./data');

const chillersSchema = new mongoose.Schema(
  {
      dateTime: {
        type: Date
      },
      enteringWaterTemp: {
        type: Number
      },
      leavingWaterTemp: {
        type: Number
      },
      enteringGasTemp: {
        type: Number
      },
      leavingGasTemp: {
        type: Number
      },
      firstCircuitPressure: {
        type: Number
      },
      secondCiruitPressure: {
        type: Number
      },
      controlPoint: {
        type: Number
      },
      unitPrecentActiveCapacity: {
        type: Number
      },
      demandLimit: {
        type: Number
      },
      chillerState: {
        type: Number,
        required: true
      },
      chillerName: {
        type: String,
        required: true
      }
  },
  { timestamps: true, versionKey: false}
);

const chillersNamesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    host: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      required: true
    },
    unitId: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, versionKey: false}
);

const devicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    host: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      required: true
    },
    unitId: {
      type: Number,
      required: true
    },
    deviceType: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, versionKey: false}
);




chillersSchema.methods.convertData = function() {
  const chiller = this;
  console.log(chiller['dateTime']);
  // if (!chiller.enteringWaterTemp && !chiller.leavingWaterTemp && !chiller.enteringGasTemp, !chiller.leavingGasTemp) {
    // return chiller;
  // }
  // Converting temperatures from F to C
  chiller.set({ enteringWaterTemp: fahrenheitToCelcius(chiller.enteringWaterTemp) });
  chiller.set({ leavingWaterTemp: fahrenheitToCelcius(chiller.leavingWaterTemp) });
  chiller.set({ enteringGasTemp: fahrenheitToCelcius(chiller.enteringGasTemp) });
  chiller.set({ leavingGasTemp: fahrenheitToCelcius(chiller.leavingGasTemp) });
  console.log(chiller);
  return chiller;
};

/**
 * * All the exported functions
 */

const changeCollectionName = async (collectionName, newName) => {
  try { 
    let db = mongoose.connection.db;
      return await db.collection(collectionName).rename(newName)
      .then(() => {
      console.log('Collection rename successful!');
      });
  
  } catch (err) {
      
  }
}

const dropCollection = async (collectionName) => {
/**
 ** This function will remove a collection from the db by the collection name
 */
  let db = mongoose.connection.db;
  db.dropCollection(collectionName, (err, result) => {
    if (err) {
      console.log('error delete collection');
    } else {
      console.log(`delete collection "${collectionName}" successfuly`);
    }
  });
  const modelName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1); // uppercase first letter
  delete mongoose.models[modelName]; // remove the model from the current mongoose instance
  delete mongoose.connections[0].collections[collectionName]; // remove the collection from the current mongoose instance
}

const getChillersNames = async () => {
/**
 * * This function will get all chiller's names from db and return them in array
 */
  const ChillersNames = mongoose.model('Devices', devicesSchema, 'devices');
  const collections = await ChillersNames.find( { deviceType: "1" } );
  const names = [];

  collections.forEach(function (collection) {
    const name = collection.name;
    const number = name.match(/\d+/g); // check if string containg numbers
    if (number) { // if name contain numbers then push name to the names array
      names.push(name);
    }
  });
  return names;
}

const getChillersSettings= async () => {
  /**
   * * This function will get all chiller's settings from db and return them in array
   */
    const ChillersDeviceSettings = mongoose.model('Devices', devicesSchema, 'devices');
    const collections = await ChillersDeviceSettings.find( { deviceType: "1" } );
  const names = [];
  
    return collections;
  }

const loadMongooseModels = async () => {
  /**
   * * This function runs when connecting to db successfuly
   */
  const chillersNames = await getChillersNames();
  chillersNames.forEach((name, index) => {
    const id = index + 1;
    createChillerModel(id, name);
  });
}

const createChillerModelAndCollection = async (id, name) => {
/**
 * * This function will create a new Chiller Model & Collection in db
 */
  const ChillerI = await createChillerModel(id,name);
  const chiller = new ChillerI({
    enteringWaterTemp: 0,
    leavingWaterTemp: 0,
    enteringGasTemp: 0,
    leavingGasTemp: 0,
    firstCircuitPressure: 0,
    controlPoint: 0,
    demandLimit: 0,
    chillerState: 0,
    chillerName: "chiller1"
  });
  await chiller.save();
}
const createChillerModel = async (id, name) => {
/**
 * * This function will create mongoose model by id and name
 */
  const ChillerI = mongoose.model(`Chiller${id}`, chillersSchema, name);
  return ChillerI;
}

module.exports = {
  changeCollectionName,
  getChillersNames,
  getChillersSettings,
  createChillerModel,
  chillersSchema,
  chillersNamesSchema,
  devicesSchema,
  dropCollection,
  createChillerModelAndCollection,
  loadMongooseModels
};