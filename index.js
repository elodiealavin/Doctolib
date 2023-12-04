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
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },

    1030: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },

    1100: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },

    1130: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1400: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1430: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1500: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1530: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1600: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1630: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1700: {
      isAvailable: { type: Boolean, default: true },
      name: { type: String, default: "" },
    },
    1730: {
      isAvailable: { type: Boolean, default: true },
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
    const booking = await Booking.findOne({ date: req.query.date });
    console.log(Booking.findOne());
    if (booking) {
      res.json(booking);
    } else {
      const newEvent = {
        date: req.query.date,
        // slots: {
        //   1000: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1030: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1100: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1130: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1400: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1430: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1500: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1530: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1600: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1630: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1700: {
        //     name: "",
        //     isAvailable: true,
        //   },
        //   1730: {
        //     name: "",
        //     isAvailable: true,
        //   },
        // },
      };
      const newDate = new Booking(newEvent);
      await newDate.save();
      res.json(newDate);
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

// Créer une route en post
app.post("/visits", async (req, res) => {
  try {
    // Chercher le booking qui corespond à la date reçue en query
    const booking = await Booking.findOne({ date: req.query.date });
    // console.log(Booking.findOne());
    // Vérifier que le créneau reçu en body est dispo > si aps dispo erorr
    // Si il est dispo le faire passer en pas dispo et enregistrer le nom reçu en body
    // save
    // répond
    if (booking) {
      // console.log(req.body);
      if (booking.slots[req.body.slot].isAvailable === true) {
        booking.slots[req.body.slot].isAvailable = false;
        booking.slots[req.body.slot].name = req.body.name;
        await booking.save();
        return res.json("Horaire validé");
      } else {
        return res.json("L'horaire n'est plus disponible");
      }
    }
    //else {
    //   const newDate = { date: req.query.date };
    //   res.json(newDate);
    // }
    // newDate.slots[req.body.slot] = {
    //   name: req.body.name,
    //   isAvailable: false,
    // };
    // const newEvent = new Booking(newDate);
    // await newEvent.save();

    // res.status(201).json("Horaire validé");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("This route doesn't exist");
});

app.listen(3000, () => {
  console.log("server has started");
});
