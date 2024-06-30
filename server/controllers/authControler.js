const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
authController.post('/register', async (req, res) => {
  
    const isExisting = await User.findOne({ email: req.body.email })

    if (isExisting) {
      throw new Error("Email is already taken by another user")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = await User.create({ ...req.body, password: hashedPassword })

    const { password, ...others } = newUser._doc
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

    return res.status(201).json({ newUser, token })
  // catch (error) {
  //   return res.status(500).json(error.message)
  // }
})
//login
authController.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error('Wrong credentials. Try again!')
    }


    const comparePass = await bcrypt.compare(req.body.password, user.password)
    if (!comparePass) {
      throw new Error('Wrong credentials. Try again!')
    }

    const { password, ...others } = user._doc
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

    return res.status(200).json({ others, token })
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
authController.put('/forgotPassword', async (req, res) => {
  try {
      console.log("You are in forgot password API");
     console.log()
    console.log(req.body.email+" "+req.body.password);
      const updatedProperty = await User.findOneAndUpdate(
          {email:req.body.email},
          { $set: { password: req.body.password }}
      )
      console.log(updatedProperty);
      updatedProperty.save();
      return res.status(200).json(updatedProperty)
  } catch (error) {
      return res.status(500).json(error)
  }
})
module.exports=authController;