import React, { useState , useEffect, useRef} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { validate } from '../Validations'
import _save from './button'
import {useForm, useFieldArray} from 'react-hook-form';
import useUnsavedChangesWarning from './warning'
import { type } from '@testing-library/user-event/dist/type'
import items from '../items.json'
import MockService from '../MockService'
import Preview from './preview'

const FieldBuilder = () => {
/*----------------------------------Browser close or reload warning--------------------------------------------------------------------------------*/    
    // beforeunload- event listener for pop on browser close
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = '';
      });
  
/*---------------------------------------Integrating UI libraries --------------------------------------------------------------------------------*/
    
    const { register, handleSubmit, setValue, watch, formState: { errors }, control, formState, reset } = useForm({
    });
/*---------------------------------------Initializing States--------------------------------------------------------------------------------------*/
    const[label,setLabel] = useState("");
    const[defaultValue, setdefaultValue] = useState("");
    const [items, setItems] = useState(["Red", "Green", "Blue"]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState("");
    const [newItemExtra1, setNewExtra1Item] = useState("");
    const [newItemExtra2, setNewExtra2Item] = useState("");
    const [checked, setChecked] = useState(false);
    const[alpha, setAlpha] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
/*-------------------------------------------------------------------------------------------------------------------------------------------------*/

    // setting options to item list and map the contents to an option tag
    let options = items;
    if(defaultValue!== "") options = items.filter(item => item!==defaultValue)

    const optionsList = options.map(option => 
    (
        <option key={option} value={option}>{option}</option>
    ));


/*-----------------------------------Event Handlers-------------------------------------------------------------------------------------------------*/
    
    //Triggered on adding an element onto the selection list
    const addNewItems = (event) =>{
       const data = event.target.value;
        setNewItem(data)
        if(newItem.length>10)
        {
            setNewExtra1Item(data.substring(0,10))
            setNewExtra2Item(data.substring(10,data.length))
        }
        else
        {
            setNewExtra1Item(data);
        }
    }

    // Handler triggered on submitting form
    const onSubmit = data => {
        // Add the items array to the data object
        data.items = items;
        // Convert to json format
        const jsonData = JSON.stringify(data);
        // Adding a check if default value is already present in the items list
        const isPresent = items.some((item) => item.includes(data.defultvalue));
        console.log("Contains : ", isPresent);
        if(isPresent) console.log("Already Present")
        else 
        {
            setItems([...items, data.defultvalue]);
            console.log(items);
            data.items = [...items, data.defultvalue]; 
            console.log(data);
        }
        if(alpha)
        {
            setItems(items.sort());
        }
        //Calling MockService.json to post jsonData to 'http://www.mocky.io/v2/566061f21200008e3aabd919'
        MockService(jsonData);
        //Setting the preview selction to visible.
        setShowPreview(true);
    };

    
    
    // updates the state of selectedItem to the item selected in the UI
    const handleItemSelection = item => {
        setSelectedItem(item === selectedItem ? null : item);
    };
    
    //Handles addition of items into items list
    const handleAddItem = () => {
        if (newItemExtra1 !== "") 
        {
          if (items.length >= 8) 
            {
                alert("Maximum items reached");
            } 
          else if (items.some(item => item.toLowerCase() === newItem.toLowerCase()))//(items.includes(newItem)) 
            {
                alert("Item already exists");
            } 
          else 
            {
                console.log("Adding data")
                setItems([...items, newItemExtra1]);
                setNewExtra1Item("");
                setNewExtra2Item("");
                setNewItem("");
            }
        }
    };
    
    //Handles removal of items from item list
    const handleRemoveItem = () => {
        if (selectedItem !== null) 
        {
            setItems(items.filter(item => item !== selectedItem))
            setSelectedItem(null);
        }
    };

    //function for handling length of default value
    const limitDefaultValue =(newValue) =>{
        if(newValue.length>=10)
        {
            setdefaultValue(newValue.substring(0,10))

        }
        else
        {
            setdefaultValue(newValue)
        }

    }

    // Handles reset button
    const handleReset = () => {
        //Setting states back to blank or null
        setItems([]);
        setSelectedItem(null);
        setNewItem("");
        setChecked(false);
        setAlpha(false);
        setLabel("");
        setdefaultValue("");
        setShowPreview(false);
        console.log("default",defaultValue);
    };
/*-----------------------------rendering the form component-----------------------------------------------------------------------------------------------------------*/
   {
    return (
    <div className='container'>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label className='lbl'>
                Label:
                <input type="text" name="name" className='txt' {...register('label',{required: 'label is required'})} 
                value={label}
                onChange={(e) => setLabel(e.target.value)}/>
            </label>
                {errors.label && <p className="error-message" style={{ color: 'red'}} >Label is required.</p>}       
            {showPreview&&(
                <div className='preview-section'>
                    <label htmlFor="my-dropdown">Preview:</label>
                    <div>
                        <select id="my-dropdown" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} multiple={checked}>
                            <option value="">{defaultValue}</option>
                            {optionsList}
                        </select>
                    </div>
                </div>
            )}
            <div>
                <label>
                Type:
                    <input type="checkbox" name="multiselect" className='check' {...register('type')}
                    checked={checked} 
                    onChange={e => setChecked(e.target.checked)} />
                    <label>Multiple select</label>
                </label>
            </div>
            <div>
                <label >
                    Default Value:
                    <input type="text" name="defultvalue"  className='txt' {...register('defultvalue') }
                    value = {defaultValue}
                    onChange={(e) => limitDefaultValue(e.target.value)}
                    />
                </label>
            </div>
            <label>Add item:</label>
            <input {...register("addedItem",{maxLength:{value: 10,message: "Maxinum length is 10"}})}
                type="text"
                id='t'
                value={newItem} 
                onChange={addNewItems}
            />
            <button type="button" onClick={handleAddItem} style={{ backgroundColor: 'green', borderRadius: "5px", color: "white", margin: 10}}>Add</button>
            <div className='input-wrapper'>
                <div>   
                <span className='red'>{newItemExtra1}</span>
                <span className='blue'>{newItemExtra2}</span>
                </div>
            </div>
            <br />
            <div style={{ marginTop: "20px" }}>
                <label>Select items:</label>
                <div {...register("selectedItems")}style={{ maxHeight: "100px", overflowY: "auto", border: "1px solid black", padding: "5px" }}>
                    {items.map(item => (
                    <div
                        //key={item}
                        onClick={() => handleItemSelection(item)}
                        style={{
                        fontWeight: item === selectedItem ? "bold" : "normal",
                        backgroundColor: item === selectedItem ? "#e6f7ff" : "white"
                        }}
                        >
                        {item}
                    </div>

                    ))}    
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={handleRemoveItem} style={{ backgroundColor: 'rgb(196, 30, 30)', borderRadius: "5px", color: "white"}}>
                Remove selected</button>
            </div>
            <br />   
            <div>
                <label>
                    Display in Alphabetical Order:
                    <input type="checkbox" className='check' {...register('isAlpha')}
                        checked={alpha} 
                        onChange={e => setAlpha(e.target.checked)}
                    />
                </label>
            </div> 
            <br />
            <div>
                <_save onClick={handleSubmit(onSubmit)}/>
                <button id='reset' className='btn btn-success' type='button' onClick={handleReset}
                >Reset</button>
            </div>
        </form>
    </div>
    )
  }
}

export default FieldBuilder