import {useState} from 'react'
import React, { Component }  from 'react';
const Preview = ({
    state = {
        optionsList : ["Red", "Green", "Blue"],
        default : "Select Option",
        visible : false
    }}) => {
    const [show, setShow] = useState(false)
    const [selectedOption, setSelectedOption] = useState("");
    const [checked, setChecked] = useState(false);
    console.log("STATE : ", state)
   
    return(
        <>
       
        {show&&(
        <div className='preview-section'>
            <label htmlFor="my-dropdown">Preview:</label>
            <div>
                <select id="my-dropdown" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} multiple={checked}>
                    <option value="">{state.default}</option>
                    {state.optionsList}
                </select>
            </div>
        </div>
    )}
    </>
    );

}

export default Preview