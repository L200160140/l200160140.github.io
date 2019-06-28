import React from "react"

function Langkah(props) {
    return (
        <React.Fragment>
            <h3>{props.item.step}</h3>
                    <div className="card border-info mb-3">
                        <div className="card-body">
                            <code>
                            <div dangerouslySetInnerHTML={{__html: props.item.code}}></div>
                            {/* {props.item.code} */}
                            </code>
                        </div>
                    </div>
        </React.Fragment>

    )
}

export default Langkah