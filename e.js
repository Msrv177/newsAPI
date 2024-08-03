import express from 'express'; 
// import { refData , latest_news_district_obj , multiCatogiri_News_Obj  } from './enadu.js';

const app = express(); 
app.listen(4000, () => { console.log(`Server Running... 💨`) });

app.get('/', (req,res)=>{
    res.send(` <h1> <a href="/info"> click me </a> </h1>`)
})
// app.get('/info', async (req, res) => {
//     try { 
//         res.send(refData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// andhra-pradesh , telangana 
// app.get('state/:id', async (req, res) => {
//     try {
//         let state = req.params.id
//         const re = await state_latest_news_obj( state );
//         res.send(re);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/dist/:id', async (req, res) => {
//     const stateName = req.params.id;
//     try {
//         const re = await latest_news_district_obj(stateName);
//         res.send(re);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

//  multiCatogiri_News_Obj - [ "politics" ,"nri", "crime", "world", "explained" , "latest-news"]
// app.get('/cat/:id', async(req,res)=>{
//     let id = req.params.id ; 
//     let re = await multiCatogiri_News_Obj( id )
//     res.send( re )
// })
