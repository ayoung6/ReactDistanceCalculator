import React from 'react';

const ResultsCard = props => {
    const { distance } = props;

    return (
        <div className="col-md-3 d-flex justify-content-center mb-3 pt-3">
            <div className='card card-shadow h-100 w-100 p-3'>
                {
                    <div>
                        <div><b>From:</b> {distance?.location1.address}</div>
                        <div><b>To:</b> {distance?.location2.address}</div>
                        <div><b>Distance:</b> {distance?.distance}</div>
                        <div><b>Duration:</b> {distance?.duration}</div>
                        <div><b>Method:</b> {distance?.method}</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ResultsCard;