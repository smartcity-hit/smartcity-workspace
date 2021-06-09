const mongoose = require('mongoose');

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

const countersSchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date
    },
    i1: {
      type: Number,
      required: false
    },
    i2: {
      type: Number,
      required: false
    },
    i3: {
      type: Number,
      required: false
    },
    n_v1: {
      type: Number,
      required: false
    },
    n_v2: {
      type: Number,
      required: false
    },
    n_v3: {
      type: Number,
      required: false
    },
    v1_v2: {
      type: Number,
      required: false
    },
    v1_v3: {
      type: Number,
      required: false
    },
    v2_v3: {
      type: Number,
      required: false
    },
    cos: {
      type: Number,
      required: false
    },
    counterName: {
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
  countersSchema,
  devicesSchema
};