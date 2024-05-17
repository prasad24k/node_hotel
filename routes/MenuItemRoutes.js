const express = require('express');
const router = express.Router();
const MenuItem=require('./../models/MenuItem');

//post rout to add a MenuItem.
router.post('/',async(req,res)=>{
  try{
    const data=req.body//asume the request body contains the person data
    const newMenuItem=new MenuItem(data);//create a new person document using the mongoose model
    const responce=await newMenuItem.save();//save the new MenuItem to the database
    console.log('data save');
    res.status(200).json(responce);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server Error'});
  }
});

//Get Method to get the MenuItem
router.get('/',async(req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data fetch');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'insternal server Error'});
  }
});
router.get('/:taste',async(req,res)=>{
  try{
    const taste=req.params.taste;//Extract the work type from the URL paramenter
    if(taste=="sweet"|| taste=="spicy" || taste=="sour"){
      const responce= await MenuItem.find({taste:taste});
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
//Update menu
router.put('/:id',async(req,res)=>{
  try{
    const menuitemId=req.params.id;
    const updatedMenuItemData=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuitemId,updatedMenuItemData, {
      new:true,
      runValidators:true,
    });
    if(!response){
      return res.status(404).json({error:"menuitem not found"})
    }
    console.log('Data updated');
    res.status(200).json(response);
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Delete Items
router.delete('/:id',async(req,res)=>{
  try{
    const menuitemId=req.params.id;
    const response = await  MenuItem.findByIdAndDelete(menuitemId);
    if(!response){
      return res.status(404).json({error:"menuitem not found"});
    }
    console.log('menuItem deleted sucessfully');
    res.status(200).json({message:'menuitem Deleted sucessful'})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
module.exports = router;