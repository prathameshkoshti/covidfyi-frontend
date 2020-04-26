import React, { useState, useEffect } from 'react'

const CategoryData = (props) => {
    const [state, setState] = useState({
        data: [],
        count: 0
    })

    // componentDidUpdate() {
    //     this.updateComp()
    // }


    useEffect(() => {
        console.log("componentDidMount called")
        if(state.count < 10) {
            let url = `http://localhost/api/v1/state/${props.state}/${props.category}`;
    
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setState({
                        data: data.entries,
                        count: state.count + 1
                    })
                    // cat = data.entries;
                })
        }
    }, [props.category])

        return (
            <div className="data-grid">
                {Array.from(state.data).map(dataUnit => {
                    return (
                        <div key={dataUnit.id} className="data-card">
                            <div className="info">
                                <div className='name'>
                                    {dataUnit.name != undefined ? dataUnit.name : dataUnit.category}
                                </div>
                                <div className="location">Location: {dataUnit.area}</div>
                                {dataUnit.phone_1 ? <div className="phone">{dataUnit.phone_1}</div> : null}
                                {dataUnit.email_1 ? <div className="email">{dataUnit.email_1}</div> : null }
                            </div>
                            <div className="cta">
                                <div className="button-group">
                                    {dataUnit.phone_1 ? <a href={`tel:${dataUnit.phone_1}`} className="contact-button">
                                        <img src="/assets/phone.svg" />Call
                                    </a> : null }

                                    {dataUnit.email_1 ? <a href={`mailto:${dataUnit.email_1}`} className="contact-button">
                                        <img src="/assets/email-icon.svg" />Email
                                    </a> : null}
                                    
                                </div>
                                {dataUnit.sourceURL ? <a className="source-link" href={dataUnit.sourceURL}>Source link</a> : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    
}

export default CategoryData