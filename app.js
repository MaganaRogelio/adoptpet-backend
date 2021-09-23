const express = require('express');
const app = express(); // Va abstraer toda la aplicación

// Librería body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config Mongoose
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI,
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
);

// Recibe los errores en la DB
mongoose.set('debug', true);

require('./models/User');
require('./models/Pet');
require('./models/Request');

require('./config/passport');
// Import schemas

// Routes
app.use('/v1', require('./routes'));

// Inicializar servidor
const PORT = 4001;
app.listen(process.env.PORT, () => {
	console.log('Server listening on port ' + process.env.PORT);
});

/* // Práctica goods and constelations
const gods = {
	Zeus: { live: "Olympus", symbol: "Thunderbolt" },
	Hades: { live: "Underworld", symbol: "Cornucopia" },
};
// Recibe que subdirección va a reconocer
app.get("/gods", (req, res) => {
	res.send(gods);
});

app.get("/gods/:name", (req, res) => {
	let god = gods[req.params.name]; // Tomar nombre de URL
	if (god) {
		res.send(god);
	} else {
		res.status(404).send("Dios no encontrado.");
	}
});

app.put("/gods/:name", (req, res) => {
	let god = req.params.name; // Tomar nombre de URL
	if (god) {
		gods[god] = req.body;
		res.send(gods);
	} else res.status(404).send("God doesn't exist.");
});

app.post("/gods", (req, res) => {
	const name = req.query.name;
	const newGod = req.body;
	gods[name] = newGod;
	res.status(200).send(gods);
});

app.delete("/gods/:name", (req, res) => {
	let name = req.params.name;
	delete gods[name];
	res.send(gods);
});

app.put("/gods/:name", (req, res) => {
	const changes = req.query;
	res.send(changes);
});

const constelations = {
	Andromeda: {
		abreviatura: "And",
		superficie: 722.3,
		num_estrellas: 152,
		estr_mas_brillante: "Alpheratz",
	},
	Aquila: {
		abreviatura: "Aq",
		superficie: 652.5,
		num_estrellas: 124,
		estr_mas_brillante: "Altair",
	},
	Casiopea: {
		abreviatura: "Cas",
		superficie: 598.4,
		num_estrellas: 157,
		estr_mas_brillante: "Gamma Cassiopeia",
	},
	Corvus: {
		abreviatura: "Cor",
		superficie: 183.8,
		num_estrellas: 29,
		estr_mas_brillante: "Giehna",
	},
};
//Challenge 1
// app.get('/cons', (req, res) => {
//     console.log(req.query);
//     if(!req.query) res.send(req.query);
//     else res.send(constelations);

// });

// Chalenge 2
// app.get('/cons/:name', (req, res) => {
//     let constel = constelations[req.params.name];
//     res.send(constel);
// })

app.get("/cons", (req, res) => {
	let search = req.query;
	if (search !== {}) {
		for (let prop in search) {
            console.log(prop);
            console.log(search[prop]);
            res.send(constelations[search[prop]]);
		}

        switch(prop){
            case 'name': 
                res.send(constelations[search[prop]]);
            break;
            case 'abr':
                res.send(constelations[search[abreviatura]]);

        }
	}
	// res.send(constelations);
}); */
