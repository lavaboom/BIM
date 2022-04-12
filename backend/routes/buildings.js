/*

You have been asked to write an endpoint which returns a list of buildings.
This data is currently stored in a JSON file within the 'data' folder in the backend.

You notice that there is a 'secretInformation' key within each 'building' object.
The team leader tells you that we do not want to expose this information in this endpoint.

*/

const router = require('express').Router();
const fs = require('fs');

// read the file
const buildingsFile = './data/buildings.json'

// helper function to fetch & format data
const readBuildings = async () => {
    const buildingData = await fs.promises.readFile(buildingsFile, 'utf8');
    const rawData = JSON.parse(buildingData);
    let result = rawData['buildings'];
    console.log(result);
    // remove the secret info in each elem
    result.forEach(element => {
        delete element.secretInformation;
    });
    return result;
}

// route to get all buildings
router.get('/all', async (req, res) => {
    const buildings = await readBuildings();
    res.status(200).json(buildings);
});

module.exports = router;
