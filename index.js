const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json());
const port = process.env.port || 5000
// rgepXZPUY15u9DeY
// product
app.get('/', (req, res) => {
  res.send('Hello World!')
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =  "mongodb+srv://product:rgepXZPUY15u9DeY@cluster0.d4lgux6.mongodb.net/?appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('product');
    const productCollection = db.collection('product_db');
    // products get
    app.get('/products', async(req,res)=>{
      const email = req.query.email
        const query = email ? { email: email } : {}; 
         const cursor = productCollection.find(query);
          const result =await cursor.toArray()
          res.send(result)
    } )
    // products get
    app.get('/latest-products', async(req,res)=>{
         const cursor = productCollection.find({}).limit(4);
          const result =await cursor.toArray()
          res.send(result)
    } )
    app.get('/products/:id',async(req,res)=>{
        const id = req.params.id 
        console.log(id);
        const query = {_id:new ObjectId(id)}
        const cursor =await productCollection.findOne(query) 
        
        res.send(cursor)
    })
    app.post('/products' , async(req,res)=>{
      const query = req.body 
      const result = await productCollection.insertOne(query) 
      res.send(result)
    })
    app.delete('/products/:id' , async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)} 
      const result = await productCollection.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
