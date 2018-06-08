# CMS-demo
# Description
Creating this demo project to learn working of nodejs and its express framework. Additional part is I am taking all the needed content for this webpage from Contentstack i.e for this I ahev creadted one stack for my project in contenstack and according to my webpage I have created various content type and then added entries in respective contents. I am taking this content data from respective url of content type which is provide by contentstack.

# Getting started

#To get the code on your machine:

Clone this code from https://github.com/almeida-shrutika/Demo-Task.git

#To install and run:

To install ----> npm install 
To run ----> node app.js

#Code Overview
#Various dependencies

express: Express is a flexible Node.js web application framework.

nunjucks : Nunjucks is a simple templating language that lets you generate HTML markup with plain JavaScript.

request: Request is designed to be the simplest way possible to make http calls.

# Folder Structure

app.js                                                                                                                

configuration                                                                                                                
   |___ config.js  
   |___ staging.js    
   |___ production.js   

controller    
   |___ contactus_controller.js    
   |___ faq_controller.js     
   |___ home_controller.js     

public   
   |___ css    
          |___ mycss.css    
   |___ js      
          |___ myjs.js  
          
routes  
  |___ route.js   

views   
  |___ contactus.html   
  |___ faq.html  
  |___ home.html   
  |___ layout      
        |___ parent.html   
  |___ partials   
        |___ footer.html   
        |___ header.html   
  

# Application Structure

app.js - The entry point to my application.

configuration/ - This folder contains configurations for my app.

routes/ - This folder contains the route definitions for our API.

public/ - This folder contains all the static files likes css, js etc.

partials/ - This folder contains the partials which I have included in main layout.

views/ - This folder contains all the views like homepage, conactus page etc.

controller/ - This folder contains code for all the dummy/skeleton callback functions which are invoke by their respective route. 

utilities/ This folder contains the common code(promises function) used by all routes.

