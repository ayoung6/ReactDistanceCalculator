import './App.css';
import React, { useState, useEffect } from 'react';
import { NavBar, AppCard, ResultsCard, PreviewCard } from './Components';
import { DistanceMatrixService, LoadScript } from "@react-google-maps/api";
import { MDBRadio } from 'mdb-react-ui-kit';
import { API } from './API';

// API key of the google map
const GOOGLE_MAP_API_KEY = '<YOUR API KEY HERE>';
const libraries = ["places"];
const locations = {
    1: null,
    2: null,
};

const hasLocations = () => (locations[1] && locations[2]);

const App = props => {
    const [updateDistance, setUpdateDistance] = useState(false);
    const [refreshList, setRefreshList] = useState(true);
    const [, setLocationsLoaded] = useState(false);
    const [distances, setDistances] = useState([]);
    const [curDistance, setCurDistance] = useState(null);
    const [method, setMethod] = useState("Driving");

    const onCalculateClick = async () => {
        if (curDistance.status === "ZERO_RESULTS") return;
        await API.postResults(locations[1], locations[2], curDistance, method, distances);
        setRefreshList(true);
    };

    const onRadioChange = selection => {
        setMethod(selection);
        if (hasLocations()) setUpdateDistance(true);
    };

    const onLoadLocation = (id, location) => {
        locations[id] = location;
        if (hasLocations()) {
            setLocationsLoaded(true);
            setUpdateDistance(true);
        }
    };

    const onLoadDistance = res => {
        const distance = res.rows[0].elements[0];
        setUpdateDistance(false);
        setCurDistance(distance);
    };

    useEffect(() => {
        if (refreshList) {
            setRefreshList(false);
            API.getResults()
                .then(res => {
                    if (!res) return Promise.reject("No Distances Logged");
                    setDistances(res);
                });
        }
    }, [refreshList]);

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_MAP_API_KEY}
            libraries={libraries}>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col pt-3 text-center">
                        <h3> Pick Two Locations </h3>
                    </div>
                </div>
                <div className="row">
                    <AppCard id={1} onLoadLocation={onLoadLocation} />
                    <AppCard id={2} onLoadLocation={onLoadLocation} />
                </div>
                <div className="row">
                    <div className="col pt-3 d-flex justify-content-center">
                        <MDBRadio name='inlineRadio' id='inlineRadio1' onClick={() => onRadioChange('Driving')} defaultChecked inline />
                        <span className="pr-3"> Driving </span>
                        <MDBRadio name='inlineRadio' id='inlineRadio2' onClick={() => onRadioChange('Transit')} inline />
                        <span className="pr-3"> Transit </span>
                        <MDBRadio name='inlineRadio' id='inlineRadio3' onClick={() => onRadioChange('Bicycling')} inline />
                        <span className="pr-3"> Bicycling </span>
                        <MDBRadio name='inlineRadio' id='inlineRadio4' onClick={() => onRadioChange('Walking')} inline />
                        <span className="pr-3"> Walking </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col pt-3 d-flex justify-content-center">
                        <button
                            className={'btn btn-secondary' + (!updateDistance && (hasLocations() && curDistance?.status !== "ZERO_RESULTS") ? '' : ' disabled')}
                            onClick={onCalculateClick}>
                            Save Distance
                        </button>
                    </div>
                </div>
                {
                    updateDistance ?
                        <DistanceMatrixService
                            options={{
                                destinations: [locations[2]],
                                origins: [locations[1]],
                                travelMode: method.toUpperCase(),
                            }}
                            callback={onLoadDistance}
                        />
                        : <></>
                }
                <div className="row">
                    <div className="col pt-3 d-flex justify-content-center">
                        {
                            curDistance ?
                                <PreviewCard distance={curDistance} />
                                : <></>
                        }
                    </div>
                </div>
                <div className="row">
                    {distances.length === 0 ? <></> : distances.map(element => <ResultsCard distance={element} />)}
                </div>
            </div>
        </LoadScript>
  );
}

export default App;
