import { apiPath } from '.';

const basepath = '/distances';

const API = {};

API.postResults = async (loc1, loc2, distance, method, distances) => {
    let dupe = false;
    const packet = {
        id: loc1.id + loc2.id + method,
        location1: { ...loc1 },
        location2: { ...loc2 },
        distance: distance.distance.text,
        duration: distance.duration.text,
        method: method,
    };

    Object.entries(distances).map(([, val]) => {
        if (val.id === packet.id) {
            dupe = true;
            return;
        }
    });

    if (!dupe)
        return await fetch(
            apiPath + basepath,
            {
                method: "POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(packet),
            })
            .then(res => (res?.ok ? res : Promise.reject(res)));
};

API.getResults = async () => 
    await fetch(
        apiPath + basepath,
        {
            method: "GET",
            headers: { 'Accept': 'application/json', },
        })
        .then(res => (res?.ok ? res : Promise.reject(res)))
        .then(res => res.json());


export default API;
