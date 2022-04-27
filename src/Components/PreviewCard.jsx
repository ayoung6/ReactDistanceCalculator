import React from 'react';

const PreviewCard = props => {
    const { distance } = props;

    const contents = distance.status === 'ZERO_RESULTS'
        ? <b> {distance.status} </b>
        : (
            <>
                <div style={{ marginBottom: 10 }}><b> Distance Preview </b></div>
                <div><b>Distance:</b> {distance?.distance.text}</div>
                <div><b>Duration:</b> {distance?.duration.text}</div>
            </>
        );

    return (
        <div className="col-md-6 d-flex justify-content-center mb-3 pt-3">
            <div className='card card-shadow h-100 w-100 p-3'>
                {contents}
            </div>
        </div>
    );
};

export default PreviewCard;