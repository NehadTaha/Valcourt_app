# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Webhook routes
Webhook endpoint to receive payloads from WordPress and save them to the database

Route: POST /webhook
Description: Receives event data from WordPress and saves or updates it in the database.
Actions:
Extracts event data from the request payload.
Updates or inserts event data into the events collection.
Sends an email notification about the event.
Sorts events by date and returns them in the response.
Webhook endpoint to delete a post/event

Route: POST /webhook/delete
Description: Deletes an event and updates related venue data.
Actions:
Deletes the event from the events collection.
Removes references to the deleted event from the related venue data.
Updates the venues collection accordingly.
Webhook endpoint to receive project data from WordPress

Route: POST /webhook/projets
Description: Receives project data from WordPress and saves or updates it in the database.
Actions:
Extracts project data from the request payload.
Updates or inserts project data into the projects collection.
Sorts projects by date and returns them in the response.
Webhook endpoint to delete a project

Route: POST /webhook/deleteProjets
Description: Deletes a project from the database.
Actions:
Deletes the project from the projects collection.
Webhook endpoint to receive "nouvelles" posts from WordPress

Route: POST /nouvelles
Description: Receives "nouvelles" post data from WordPress and saves it in the database if it belongs to the "nouvelles" category.
Actions:
Extracts post data from the request payload.
Checks if the post belongs to the "nouvelles" category.
Updates or inserts post data into the database.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
Mongodb database

navigate to the Mongodb website and first create an account.

Than go under the deployment tab and click on database.

Click on “Build a cluster”.

For now choose the free option to test in out and when your ready you’ll do these steps again with the appropriate option.

Set the name of the cluster as you like.

The provider can be any of the choices.

The region should be the closest one to you.

Click “Create Deployment”.

Choose the username and password option.

Set your username and password to something secure and remember them for later.

Click create user.

Choose “Cloud Environment”.

Click on “finish and close”.

Now that you are back on the database tab you should see your cluster then click on “Browse Collection”.

Click on “Create database” .

Name the database it “valcourtApp”.

Collection name will be "users” for now.

Click “Create”.

Now if you hover valcourtApp database you will see a plus sign, using this you will create a few more collections, their names are: “combinedData”, “events”, “projects”, “venues” and “nouvelles”

You will now click on “connect to cluster”.

Select the first option “Drivers”.

Select Node.js for the driver and select the latest version.

It will give you a connection string, copy it.

Now go in the projects files, into backend and open database.

Replace the url string with the url string you just copied and replace where it says “” with you cluster password.

Now your database is up and running and connected to the app.

###Launch an instance

Navigate to the AWS management console and choose EC2 among the services listed.

On the left side menu, select Instances.

Click on Launch Instances.

Configure the instance (instance type, instance details, storage, security groups).

Create a new key pair and configure it.

Adjust the network settings and establish a new security group. Choose a fitting name and ensure that the “Auto-assign public IP” option is enabled.

Configure the inbound security group rules to permit SSH, HTTP, and HTTPS initially. Be sure to open two HTTP-type ports. One for port 3000, and the other for port 8080. Additional ports can be allowed later based on the application’s requirements.

Maintain the default settings for the remaining configurations and proceed to launch the instance.

###Connecting to the EC2 Instance:

Utilize your preferred SSH terminal to connect to the EC2 instance. In my case, I will be using MobaXterm.

To access the EC2 server, you can use MobaXterm, a free software that you can download from https://mobaxterm.mobatek.net/.

Open MobaXterm and select “SSH.”

Enter your EC2’s public IP address and use the username “ec2-user”.

the “Use private key” option and select the key pair you created in AWS.

Update the package sudo apt-get update -y

###Install Node and NPM using nvm:

Install node version manager (nvm) by typing the following at the command line. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

We will use nvm to install Node.js because nvm can install multiple versions of Node.js and allow you to switch between them.

Activate nvm by typing the following at the command line. . ~/.nvm/nvm.sh

Use nvm 18.0.0 which is a supported and stable version: nvm install 18.0.0

Cloning ReactJS App to EC2:

Before proceeding with the deployment, ensure you have Git installed on your EC2 instance. If not, install it using: sudo yum install -y git

Clone the ReactJS app repository: git clone https://github.com/NehadTaha/Valcourt_app.git

Move into the cloned directory: cd Valcourt_app/

###Install all the required dependencies:

To install the dependencies use the below command : npm install

Run the application: npm start

Using PM2 to Run and Manage React Apps:

Install PM2 Globally:

Open a terminal and install PM2 globally using the following command: npm install -g pm2

Start Your React App with PM2: pm2 start npm --name "react-app" -- start

Check the status of your running processes to ensure your React app is listed: pm2 list

###Accessing Your React App from the Browser:

Before this, you need to make sure that in the Security group of your EC2 Instance, port 3000 is allowed in the inbound rules:

Open your web browser and take the public IP of your EC2 Instance with port 3000: http://34.229.192.235:3000/

Additional PM2 Commands (Optional):

If you need to stop your React app, you can use: pm2 stop react-app

To manually restart your React app, use: pm2 restart Valcourt_app

Sources

Step-by-Step Guide to Deploying ReactJS on AWS EC2 Instance | by Mudasir | Medium

Create a cluster | mongodb
