const express = require('express');
const router = express.Router();
const Person=require('./../models/Person');

//post rout to add a person
router.post('/',async(req,res)=>{
  try{
    const data=req.body //asume the request body contains the person data

    const newPerson=new Person(data);//create a new person document using the mongoose model

    const responce = await newPerson.save();//Save the new person to the database
    console.log('data saved');
    res.status(200).json(responce);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server Error'});
  }
});
//Get method toget the person
router.get('/',async(req,res) =>{
  try{
    const data = await Person.find();
    console.log('data fetch');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server Error'});
  }
});
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;//Extract the work type from the URL parameter
  if(workType=='chef'|| workType=='manager' ||workType=='waiter'){
    const responce = await Person.find({work: workType});
    console.log('responce fetched');
    res.status(200).json(responce);
    
  }else{
    res.status(400).json({error:'invalid work type'});
  }

  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal Server Error'})

  }
});
//Update data
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the Url parameter
    const updatedPersonData = req.body; // Updated data for the person
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Data updated');
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete route
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;//Extract the person's ID from the URl parameter
    //Assume you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      // If no response, it means the person with the given ID was not found
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Person deleted sucessfuly');
    res.status(200).json({message:'person Deleted Sucessfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router;