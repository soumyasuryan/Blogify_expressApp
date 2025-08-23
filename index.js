import express from "express"
const app=express()
const port=3000
const titles=[]
const dates=[]
const contents=[]
const arr=[]
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.render("index1.ejs")
})
app.get("/create",(req,res)=>{
    res.render("index2.ejs")
})
app.get("/submit_blog",(req,res)=>{
    res.render("index3.ejs")
})
app.post("/submit",(req,res)=>{
    titles.push(req.body["title"])
    dates.push(req.body["date"])
    contents.push(req.body["text"])     
})
app.get("/view",(req,res)=>{
    res.render("index5.ejs",{titles,dates,contents})
})
app.get("/view-blog/:index",(req,res)=>{
    const i=req.params.index;
    res.render("index6.ejs",{ title: titles[i],
        date: dates[i],
        content: contents[i]});
    
    // res.render("index6.ejs",{titles[res.index],dates[res.index],contents[res.index]})
})
app.post("/delete",(req,res)=>{
    const index=parseInt(req.body.index)
    if (!isNaN(index) && index >= 0 && index < titles.length) {
    titles.splice(index, 1); // Delete 1 item at given index
    dates.splice(index, 1); // Delete 1 item at given index
    contents.splice(index, 1); // Delete 1 item at given index
  }
  res.redirect("/view")
  
})
app.get("/update/:index",(req,res)=>{
    const indx=parseInt(req.params.index)
    arr.push(indx)
    if (!isNaN(indx) && indx >= 0 && indx < titles.length) {
     res.render("index4.ejs",{indx,title:titles[indx],date:dates[indx],content:contents[indx]})
    
  }
})
app.post("/change", (req, res) => {
    const indx = parseInt(req.body.index);

    if (!isNaN(indx) && indx >= 0 && indx < titles.length) {
        // Update in place
        titles[indx] = req.body.title;
        dates[indx] = req.body.date;
        contents[indx] = req.body.content;
    }

    res.redirect("/view");
});

app.listen(port,()=>{
    console.log('Listening on port '+port);
})