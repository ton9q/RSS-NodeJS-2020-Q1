## Task 4. Database MongoDB

1. Use MongoDB database to store REST service data (Users, Boards, Tasks).

- Follow the [MongoDB Atlas registration link](https://www.mongodb.com/cloud/atlas/register).
- Feel all mandatory fields and click create account button.
- Choose “Starter Cluster” option and click Create a cluster.
- The next screen choose: cloud provider - AWS, region - Ireland (eu-west-1) and click “Create Cluster” button (Not change another options).
- Click Security - Database access tab.
- Click Add new user button.
- Choose method - Password and fill the username and the password fields (remember them, you will use them to connect mongodb database).
- User Privileges - Set read and write to any database.
- Click “Add user” button.
- Click Security - Network Access tab.
- Click “Add IP Address” button.
- Click “Allow access from anywhere” button.
- Click “Confirm” button.
- You can generate connect string, by the following: in Atlas - Clusters tab click “Connect” button.
- On Modal window (Connect to Cluster) click “Connect your Application” button.

2. Use [Mongoose ODM](https://mongoosejs.com/) to store and update data.
3. The information on DB connection (connection string) should be stored in `.env` file and should be passed to the application using the environment variables with the help of the following [dotenv package](https://www.npmjs.com/package/dotenv).