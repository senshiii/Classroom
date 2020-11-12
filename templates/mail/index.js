exports.registration = (
  name
) => `<img src="https://classroom-99.s3.amazonaws.com/classroom.png" width="100% alt="Homeroom Banner" />
<h1>Welcome to Homeroom, ${name}</h1>
<h3>We are so happy to have you onboard. 🎊🥳</h3>
<p>Here are the things you can do in Homeroom: </p>
<ul>
  <li>Create a classroom for as many students and teachers as you wish.</li>
  <li>Join as many classrooms as you wish.</li>
  <li>Manage all your data and members of your classroom.</li>
  <li><strong>Enjoy Learning</strong></li>
</ul>
<p>Visit your profile <a href="http://locahost:3000/dashboard" target="_blank" >here</a></p>
`;

exports.newLecture = (classroomName, classroomCode, lecture) => {
  return `<img src="https://classroom-99.s3.amazonaws.com/classroom.png" width="100% alt="Homeroom Banner" />
<h1>A new Lecture, ${lecture} has been added to the following classroom</h1>
<h4> Classroom Name: ${classroomName}, Classroom Code: ${classroomCode} </h4>
`;
};

exports.getClassroomPassword = (name, code, password) => `
<img src="https://classroom-99.s3.amazonaws.com/classroom.png" width="100% alt="Homeroom Banner" />
<h2>Requested Data for Classroom - ${name} : ${code} is : ${password} </h2>
<h4>Caution: Please share this data with discretion. Anybody who has access to this data can join your classroom as a Faculty. 
`;
