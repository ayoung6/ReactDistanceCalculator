import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from "@react-google-maps/api";

const AppCard = props => {
    const { id, onLoadLocation } = props;
    const [searchBox, setSearchBox] = useState(null);
    const [place, setPlace] = useState(null);

    const onLoad = ref => setSearchBox(ref);
    const onPlaceChanged = () => {
        let p = searchBox.getPlace()
        setPlace({
            id: p.place_id,
            address: p.formatted_address,
            lat: p.geometry.location.lat(),
            lng: p.geometry.location.lng(),
        });
    };

    useEffect(() => {
        if (place) onLoadLocation(id, place);
    }, [place]);

    return (
        <div className="col-md-6 d-flex justify-content-center mb-3 pt-3">
            <div className='card card-shadow h-100 w-100 p-3'>
                <Autocomplete
                    onPlaceChanged={onPlaceChanged}
                    onLoad={onLoad}>
                    <input className='w-100' />
                </Autocomplete>
                {
                    <div style={{ marginTop: 20, lineHeight: '25px' }}>
                        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
                        <div><b>Address:</b> {place?.address}</div>
                        <div><b>Lat:</b> {place?.lat}</div>
                        <div><b>Lng:</b> {place?.lng}</div>
                    </div>
                }
            </div>
        </div>
    );
};

AppCard.propTypes = {
    id: PropTypes.number.isRequired,
    onLoadLocation: PropTypes.func.isRequired,
};

export default AppCard;