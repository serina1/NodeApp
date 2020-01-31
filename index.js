const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const createHTML = require('create-html')
var pdf = require('html-pdf');


const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username:"
  }, 
  {
    type: "input",
    name:  "color",
    message: "Enter  your fav color"

  }

]
inquirer.prompt(questions).then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
    //   const repoNames = res.data.map(function(repo) {
    //     return repo.name;
    //   });

    const  data = [
      
      res.data.bio, 
      res.data.location,
      res.data.avatar_url, 
      res.data.public_repos,
      res.data.name,
      res.data.followers,
      res.data.following, 
      res.data.public_gists,
      res.data.html_url,
      res.data.bio,
      res.data.company
    
    ]

    console.log(res.data);

  
 const generateHTML = createHTML({
  title: 'example',
  head: `<style type="text/css">
  * {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
     }
     .body
     {
         padding:30px;
         background-color:rgb(164, 172, 240);
     }
     .container
     {
     margin-top: 50px;
     width: 80%;
     margin: auto;
     text-align: center;
     background-color: rgb(255, 255, 255);
     padding: 20px;
     margin-bottom: 20px;
     border-radius: 5px;
     }
     #img
    {
     align-self: center;
     width: 40%;
     border: solid 2px white;
      border-radius: 50%;}
     }
     .main
     {
      margin-top:30px;
      padding: 25px;
      background-color: white;
      padding: 30px;
     }
    .list
    {
      margin:10px;
      display: flex;
      justify-content: space-around;
     }
   .row
    {
      margin-top: 10px;
      display:flex;
      justify-content: space-around;
      padding: 30px;
    }
    p{
      text-align: center;
      font-family: Arial, Helvetica, sans-serif
    }
   #section
     {
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif
     text-align: center;
      width:40%;
      padding: 10px;
      margin:10px;
      border-radius: 5px;
      display:flex;
    }
  
  h1
  {
      margin:0 auto
  }
  .footer{
    width: 100%;
    position: fixed;
    height: 30%;
    background-color: rgb(164, 172, 240);
  }
 </style>`,
  body: `    <div class="body">

  <div class="container" style="background-color: ${color}">
      <img id="img"src="${data[2]}" alt="profilePic">
      <h1>Hi! <br>My name is ${data[4]}</h1>
      
         <ul class="list">
             <li><a href="http://google.com/maps/place/${data[1]}/"target="blank">Location</a></li>
             <li><a href="${data[8]}"> GitHub</a></li>
             <li><a href="${data[9]}">Blog</a></li>
        </ul>
 </div>
</div>

  <div class="main">
     <p>${data[0]}</p>
       <div class="row">
         <section id="section" style="background-color:${color}">Public Repositories<br>${data[3]}</section>
         <section id="section" style="background-color:${color}">Followers<br>${data[5]}</section>
       </div>

       <div class="row">
         <section id="section" style="background-color:${color}">GitHub Stars<br>${data[7]}</section>
         <section id="section" style="background-color:${color}">Following<br>${data[6]}</section>
       </div>

   </div>
   
<div class="footer"></div>`
})
 
fs.writeFile('index.html', generateHTML, function (err) {
  if (err) console.log(err)
})
   //   const repoNamesStr = repoNames.join("\n");

     
   // const html = fs.readFileSync('generateHTML.js', 'utf8');
    //console.log(typeof html)
    pdf.create(generateHTML).toFile('repos.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    
    });
  });
