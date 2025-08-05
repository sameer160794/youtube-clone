🎥 Video Sharing App
A full-stack video-sharing platform built with MERN (MongoDB, Express, React, Node.js). Users can view, like/dislike, and comment on videos. The app also supports view count tracking and recommended videos — similar to YouTube, but lightweight and customizable.

📸 Features
✅ Upload and display YouTube videos

👤 User login/logout (via localStorage)

👍 Like / 👎 Dislike functionality (toggle support)

💬 Comment system with usernames

👁️ Accurate view tracking

🔄 Recommended videos list

📈 Automatic view count increment

🔐 Authentication-based interactions (like, comment, etc.)


🛠 Tech Stack
Tech	Description
React	Frontend UI (SPA using React Router)
Node.js	Backend runtime
Express	RESTful API server
MongoDB	NoSQL database (via Mongoose)
Axios	HTTP requests
LocalStorage	Temporary auth/session handling


📁 Folder Structure
bash
Copy
Edit
/client         → React(Vite) frontend
/server         → Express backend
/models         → Mongoose schemas (Video, User)


🐛 Known Issues / To-Do
 Add authentication (JWT or OAuth)

 Allow video uploads (not just embedding YouTube)

 Add comment timestamps and delete/edit options

 Prevent multiple view counts from same user/IP

 Add pagination for recommended videos