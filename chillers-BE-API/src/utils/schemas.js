const mongoose = require('mongoose');

const chillersSamplesSchema = new mongoose.Schema(
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
  { 
    timestamps: true, 
    versionKey: false 
  }
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
  { 
    timestamps: true, 
    versionKey: false
  }
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
    isAlive: {
      type: Boolean,
      required: false
    },
    deviceType: {
      type: Number,
      required: true
    }
  },
  { 
    timestamps: true, 
    versionKey: false
  }
);

const countersSamplesSchema = new mongoose.Schema(
  {
    i1: {
      type: Number,
      required: true
    },
    i2: {
      type: Number,
      required: true
    },
    i3: {
      type: Number,
      required: true
    },
    n_v1: {
      type: Number,
      required: true
    },
    n_v2: {
      type: Number,
      required: true
    },
    n_v3: {
      type: Number,
      required: true
    },
    v1_v2: {
      type: Number,
      required: true
    },
    v1_v3: {
      type: Number,
      required: true
    },
    v2_v3: {
      type: Number,
      required: true
    },
    cos: {
      type: Number,
      required: true
    },
    counterName: {
      type: String,
      required: true,
      unique: true
    },
    updatedAt: {
      type: Date,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

module.exports = {
  chillersSamplesSchema,
  chillersNamesSchema,
  devicesSchema,
  countersSamplesSchema
};