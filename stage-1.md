# pre-install and install stages

1. Check versions of nodejs, npm & npx:  
> $ node --version  
> $ npm --version  
> $ npx --version  
<i>If it is missing or requires to update, do so via Command line.</i>  
2. Install Gulp Command Line Utility <i>'gulp-cli'</i> globaly:  
> $ npm install --global gulp-cli  
3. Create a project directory and navigate into it  
> $ npx mkdirp [your-project]  
> $ cd [your-project]  
4. Create a <i>'package.json'</i> file in your project directory  
> $ npm init  
// This will guide you through giving your project a name, version, description, etc.  
5. Install the gulp package in your devDependencies  
> $ npm install --save-dev gulp  
6. Verify your gulp versions  
> $ gulp --version  


