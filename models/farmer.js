import mongoose from 'mongoose';

const farmerschema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required:true,
  },
  gender: {
    type: String,
    required:true,
  },
  mobile_number:{
    type:Number,
    required:true,

  },
  address:{
    type:String,
    required:true,
  },
  bank_account:{
    type:Number,
    required:true,
  },
  district:{
    type:String,
    // required:true,
  },
  state:{
    type:String,
    required:true,
  },
  farm_size:{
    type:Number,
    required:true,
  },
  type_of_soil:{
    type:String,
    // required:true,

  },
  crop_name:{
    type:String,
    // required:true,
  },
  crop_duration:{
    type:Number,
    // required:true,
  },
  farmer_photo:{
    type:String,
    // required:true,
  },
  passbook_number:{
    type:Number,
    // required:true,
  },
  productionCapacity: {
    type: String,
    // required: true,
  },
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['active', 'funded', 'completed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Farmer', farmerschema); 