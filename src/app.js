const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const port =process.env.PORT || 3000;

//Define Paths and Static Config for Express Config.
app.use(express.static(path.join(__dirname, "../public")));

//Setup handler engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, '../templates/views'));

//partials path setup 
const partialpath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialpath);


app.get("/", (req, res) => {
    res.render("index", { title: "Weather App", name: "Deepak Sindhwani" });
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About Me", name: "Deepak Sindhwani" });
})
app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send({
            error:"Please Enter Address in URL"
        });

    geoCode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if (error)
            return res.send({error})
        else {
            console.log("Place " + placename)
            let lonlat = latitude + "," + longitude;
            forecast(lonlat, (error, data) => {
                if (error)
                    return res.send({error})
                else {
                    const { weatherdesc, temp, feelslike , weatherIcon } = data
                    return res.send({
                        placename,
                        weatherdesc,
                        temp,
                        feelslike,
                        weatherIcon                 
                    })
                    //console.log(`${weatherdesc} It is currently ${temp} degree out. It feels like ${feelslike} degree out`)
                }
            })
        }
    });
})



app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        helpText: "This is some helping text",
        name: "Andrew Mead"
    })
})

app.get("/help/*", (req, res) => {
    res.render("error404", {
        title: "Error 404",
        helpText: "Help Content Not Found",
        name: "Deepak Sindhwani"
    })
})

app.get("*", (req, res) => {
    res.render("error404", {
        title: "Error 404",
        helpText: "Page Not Found",
        name: "Deepak Sindhwani"
    })
});

app.listen(port, () => {
    console.log("Server is Up and Running on Port ",port);
})
