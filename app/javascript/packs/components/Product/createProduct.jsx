import Axios from 'axios';
import React,{useState} from 'react';
import axios from 'axios';

const CreateProduct = () => {
  let [name, setName] = useState("")
  let [description, setDescription] = useState("")
  let [price, setPrice] = useState("")
  let [image, setImage] = useState("")
  
  let submit = () => {
    console.log(name, description, price, image)
    let body = {
      name, 
      description,
      price,
      image
    }

    axios.post('/api/v1/products', body).then((res) =>{
      setName("")
      setDescription("")
      setPrice("")
    }).catch((err) => console.log("Error : " + err.message))
    
  }
  return (
    <div>
      <input type='text' placeholder="title" value={name} onChange={(e)=> setName(e.target.value)}></input>
      <textarea cols="30" rows="5" value={description} onChange={((e) => setDescription(e.target.value) )}></textarea>
      <input type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
      <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};

export default CreateProduct;
