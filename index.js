const { Console } = require("console");
const { setMaxListeners } = require("events");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/doctolib");

const Booking = mongoose.model("Booking", {
  date: Date,
  slots: {
    1000: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },

    1030: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },

    1100: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },

    1130: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1400: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1430: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1500: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1530: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1600: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1630: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1700: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
    1730: {
      isAvailable: Boolean,
      name: { type: String, default: "" },
    },
  },
});

app.get("/", (req, res) => {
  try {
    res.status(200).json("Je suis dans ma route `/`");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/visits", async (req, res) => {
  try {
    const booking = await new Booking.findOne(req.query.date);
    console.log(Booking.findOne());
    if (date) {
      res.json(booking);
    } else {
      const newEvent = {
        date: req.query.date,
        slots: {
          1000: {
            name: "",
            isAvailable: true,
          },
          1030: {
            name: "",
            isAvailable: true,
          },
          1100: {
            name: "",
            isAvailable: true,
          },
          1130: {
            name: "",
            isAvailable: true,
          },
          1400: {
            name: "",
            isAvailable: true,
          },
          1430: {
            name: "",
            isAvailable: true,
          },
          1500: {
            name: "",
            isAvailable: true,
          },
          1530: {
            name: "",
            isAvailable: true,
          },
          1600: {
            name: "",
            isAvailable: true,
          },
          1630: {
            name: "",
            isAvailable: true,
          },
          1700: {
            name: "",
            isAvailable: true,
          },
          1730: {
            name: "",
            isAvailable: true,
          },
        },
      };
      const newDate = new Booking(newEvent);
      await newDate.save();
      res.json(newDate);
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("This route doesn't exist");
});

app.listen(3000, () => {
  console.log("server has started");
});
