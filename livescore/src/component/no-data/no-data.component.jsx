import React from 'react';
import nodata from '../../asset/no-data.png'

const NoDataFound = () => {

    return (
        <div>
            <img
             src={nodata}
             style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '50%',
                    marginBottom:'15px'
                  }} />
        </div>
    )


}

export default NoDataFound;