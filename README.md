# Classroom

### A classroom app for effective online studying and teaching.
Features:

1. Unlimited Classrooms with unlimited capaacity.
2. Join classrooms without any limit.
3. Find All your documents in one place. Improved File Management.
4. Manage Members of your classroom.
5. Email Notifications ( Doesn't go into spam.)

![Classroom Image](https://classroom-99.s3.amazonaws.com/classroom_demo.png)

### A Brief Intro on how a Classroom Works -

1. You can be either a **teacher**, a **student** or the **head** of the classroom. The creator of the classroom is by default the **Head**
2. A Classroom can have **unlimited Lectures and Announcments**
3. Each Lecture can hold respective **notes**. [ Any File Type ]
4. A Student has **no write rights**. They can only **access and download files**, and read Lecture and Assignments
5. A Teacher can **create** Lectures, Announcments, **add files** to Lectures.
6. The Head of the Class has all rights of a teacher. In addition to that, a Head can **remove** students and teachers from the classroom.
7. A Head **cannot leave the classroom**. In order to leave the classroom you have to **appoint** some other teacher in the classroom as head.

### Stack Used:

- **ReactJS**
- **ExpressJS**
- **NodeJS**
- **MongoDB**
- **Mongoose ORM**

If you do wish to fork, clone this project, here is the list of

#### .env Variables

- **DB_URI** - MongoDB Connection String
- **ACCESS_TOKEN_SECRET** - Secret value for signing JWT tokens
- **CLIENT_URL** - Hosted Url of React App. Used in CORS Configuration.
- **AWS_ACCESS_KEY** - AWS Access Key
- **AWS_SECRET_KEY** - AWS Secret Key
- **AWS_S3_BUCKET_NAME** - Name of your S3 Bucket.
- **OAUTH_CLIENT_ID** - Your OAuth Application Client Id
- **OAUTH_CLIENT_SECRET** - Your OAuth Applocation Client Secret
- **OAUTH_REDIRECT_URL** - Configured Redirect Url for your OAuth Application
- **OAUTH_REFRESH_TOKEN** - Refresh token generated using your OAuth Application
