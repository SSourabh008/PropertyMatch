const { request } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const Property = require('../models/Property')
const User = require('../models/User')
const propertyController = require('express').Router()

// get all
propertyController.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({})
        // .populate("currentOwner", '-password')

        console.log(properties)

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

// get featured
propertyController.get('/find/featured', async (req, res) => {
    try {
        const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// get all from type
propertyController.get('/find', async (req, res) => {
    const type = req.query//?type='beach'-> query
    let properties = []
    try {
        if (type) {
            properties = await Property.find(type).populate("currentowner", '-password')
        } else {
            properties = await Property.find({})
        }

        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error)
    }
})
//Finding Rent type
propertyController.get('/find/rent', async (req, res) => {
    const type = 'rent';//?type='beach'-> query
    let properties = []
    try {
            properties = await Property.find({type:"rent"})
            // console.log("Here are the properties:"+properties);
            return res.status(200).json(properties)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
})
propertyController.get('/find/purchase', async (req, res) => {
    //?type='beach'-> query
    let properties = []
    try {
            properties = await Property.find({type:"purchase"})
            // console.log("Here are the properties:"+properties);
            return res.status(200).json(properties)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
})

// TODO FETCH TYPE OF PROPERTIES. EX: {BEACH: 34, MOUNTAIN: 23}
propertyController.get('/find/types', async (req, res) => {
    try {
        const rentType = await Property.countDocuments({ type: 'rent' })
        const purchaseType = await Property.countDocuments({ type: 'purchase' })
        

        return res.status(200).json({ rent: rentType, purchase: purchaseType })
    } catch (error) {
        return res.status(500).json(error)
    }
})

// fetch my properties
propertyController.get('/find/my-properties', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ currentOwner: req.user.id })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

// fetch bookmarked yachts
propertyController.get('/find/bookmarked-properties', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ bookmarkedUsers: { $in: [req.user.id] } })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

// TODO FETCH INDIVIDUAL PROPERTY
propertyController.get('/find/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password');
        console.log(property);

        if (!property) {
            throw new Error('No such property with that id')
        } else {
            return res.status(200).json(property)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


// create estate
propertyController.post('/', verifyToken, async (req, res) => {
    try {
        const newProperty = new Property({ ...req.body, currentOwner: req.user.id });
        const savedP = await newProperty.save();
        return res.status(201).json(newProperty)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
})


// update estate
propertyController.put('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update other people's properties")
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedProperty)
    } catch (error) {
        return res.status(500).json(error)
    }
})


// bookmark/unbookmark estate
propertyController.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (property.bookmarkedUsers.includes(req.user.id)) {
            property.bookmarkedUsers = property.bookmarkedUsers.filter(id => id !== req.user.id)
            await property.save()
        } else {
            property.bookmarkedUsers.push(req.user.id)

            await property.save()
        }

        return res.status(200).json(property)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// delete estate
propertyController.delete('/:id', verifyToken, async (req, res) => {
    try {
        
        console.log("yOU ARE IN DELETE API");
        const property = await Property.findById(req.params.id)
        console.log(property);
        // console.log(property.currentOwner);
        // console.log(req.user.id);
        // console.log(property.currentOwner.toString() !== req.user.id)
        if (property.currentOwner.toString() !== req.user.id) {
            console.log("Iam in this throw error if block")
            throw new Error("You are not allowed to delete other people properties")
        }
        console.log("Iam reaching here");
        await Property.deleteOne({_id:req.user.id});
        console.log("Done");
        return res.status(200).json({ msg: "Successfully deleted property" })
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = propertyController