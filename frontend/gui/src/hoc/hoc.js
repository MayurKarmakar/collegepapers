import React from 'react'

function hoc(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}
export default hoc;