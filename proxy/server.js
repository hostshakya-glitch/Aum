const http=require("http");
http.createServer(async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Content-Type");
  if(req.method==="OPTIONS"){res.writeHead(204);return res.end()}
  if(req.method!=="POST"){res.writeHead(405);return res.end()}
  let b="";for await(const c of req)b+=c;
  try{
    const {prompt}=JSON.parse(b);
    const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",
      headers:{"content-type":"application/json","x-api-key":process.env.ANTHROPIC_API_KEY,"anthropic-version":"2023-06-01"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:4000,messages:[{role:"user",content:prompt}]})});
    const j=await r.json();
    const text=(j.content||[]).map(x=>x.text||"").join("");
    res.writeHead(r.ok?200:502,{"Content-Type":"application/json"});res.end(JSON.stringify({text}));
  }catch(e){res.writeHead(500);res.end(JSON.stringify({error:String(e)}))}
}).listen(process.env.PORT||8787);
