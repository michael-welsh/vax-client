# Vax Client
This project is the frontend for the service that scrapes Hong Kong vaccination stats from the government website, and presents them in pretty graphs. 

At the time of creation of this project, there was oddly no other site providing this information in graphical format. Ths whole project is of course outdated, but serves as a quick example of using python-based data scraping tools and some Angular-based graph packages 


### Stack

This is anb Angular 10 app that makes heavy use of Bootstrap and Chart.js. 

The app is containerized and is built using GCP Cloud Build. Any commits to this repository will spark a new build and new revision in Cloud Run. 

### Setup
1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install -g @angular/cli```
5. Then: ```npm install```
6. And: ```ng serve```
7. Navigate to: [http://localhost:4200/](http://localhost:4200/)

### Project Scaffold

Build out python project scaffold:

* [Makefile](https://github.com/michael-welsh/vax-service/blob/main/Makefile)
* [requirements.txt](https://github.com/michael-welsh/vax-service/blob/main/requirements.txt)
* [Dockerfile](https://github.com/michael-welsh/vax-service/blob/main/Dockerfile)







