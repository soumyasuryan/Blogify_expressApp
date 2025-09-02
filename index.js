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
app.post("/submit", (req, res) => {
  const title = req.body["title"]?.trim();
  const date = req.body["date"]?.trim();
  const content = req.body["text"]?.trim();

  if (!title || !date || !content) {
    return res.render("index3.ejs", { error: "⚠️ All fields are required!" });
  }

  titles.push(title);
  dates.push(date);
  contents.push(content);

  
  return res.render("index3.ejs",{ message: "Blog posted successfully!✅" })
});
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
    const title = req.body.title?.trim();
    const date = req.body.date?.trim();
    const content = req.body.text?.trim();

    if (!title || !date || !content) {
      return res.render("index4.ejs", {
        error: "⚠️ All fields are required!",
        indx,
        title: titles[indx],
        date: dates[indx],
        content: contents[indx]
      });
    }


    titles[indx] = title;
    dates[indx] = date;
    contents[indx] = content;

    return res.render("index4.ejs", {
      message: "✅ Updated Successfully!",
      indx,
      title,
      date,
      content
    });
  }


  res.status(404).send("Blog not found!");
});


app.listen(port,()=>{
    console.log('Listening on port '+port);
})