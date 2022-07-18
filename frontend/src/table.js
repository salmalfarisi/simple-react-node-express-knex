import { MDBDataTable } from "mdbreact";
import { React, useState, useEffect } from 'react';

const DT = (props) => {  

    return (
        <div>
            <MDBDataTable
            responsive
            bordered
            data={props.data}
            searching={true}
            paging={true}
            info={false}
            />
        </div>
    )
}

export default DT;