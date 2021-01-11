const mongoose = require('mongoose');

/**
 * * All the Schemas
 */

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

module.exports = {
  chillersSchema,
  chillersNamesSchema,
  devicesSchema
};