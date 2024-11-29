import React, { useEffect, useState } from "react";

function Heading(props)
{
    return (
        <main className="form_main-content">
            <div className="form_content-container">
                <h1 className="form_heading">{props.heading}</h1>
            </div>
        </main>
    );
}

export default Heading;