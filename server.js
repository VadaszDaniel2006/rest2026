const express = require("express"); //Express importálása
const app = express(); //Express példányosítása
const port = 3000; //Port beállítása

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


//GET végpont egy szöveges üzenet visszaküldésre
app.get('/hello', (req, res) => {
    res.send("Hello itt az Express webszerver!");
})

app.get('/api.courses', (req, res) => {
    res.json(courses);
})


//Egyetlen kurzus adatainak lekérése url paraméter alapján
app.get('/api.courses/:id', (req, res) => {
    //Keresés a tömben ID(url paraméter) alapján
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //A keresett elem nem található(404) státuszkód és hibaüzenet visszaadása
    if (!course) res.status(404).send('A megadott ID-val nem létezik kurzus!');
    res.json(course); //A visszaadjuk a keresett kurzust
})

//POST végpont kurzus adatok küldésére 
app.post('/api.courses', (req, res) => {
//Új kurzus objektum létrehozása (Az ID automatikus növelése)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    //A curse objektum hozzáadása a courses tömbhöz
    courses.push(course); 
res.status(200).json({message: "Új elem hozzáadva", data:req.body}); 
})

//Delete végpont kurzus adatok törlésére
app.delete('/api.courses/:id',(req, res) => {
    //Keresés a tömben ID(url paraméter) alapján
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //A keresett elem nem található(404) státuszkód és hibaüzenet visszaadása
    if (!course) res.status(404).send('A megadott ID-val nem létezik kurzus!');
    
    const index = courses.indexOf(course);//A törölni kívánt elem indexének a meghatározása a courses tömbben
    courses.splice(index, 1);//Az elem törlése a courses tömbből
    res.json({message: "Sikeres adat törlés", data: req.body})//A törlés nyugtázása
})



//A webszerver elindítása
app.listen(port, () => {
    console.log(`A webszerver figyel a localhost:${port} webcímen`);
})