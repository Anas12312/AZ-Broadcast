import { io } from 'socket.io-client';

export const BASE_URL = 'http://localhost:4000'
// export const BASE_URL = "https://webrtc-test-l40m.onrender.com";

export const socket = io(BASE_URL);

// Get user local data
let localUsername = localStorage.getItem('username');
let localImage = localStorage.getItem('image');

if (!localUsername) {
  localUsername = 'USER' + Math.floor(Math.random() * 10000);
  localStorage.setItem('username', localUsername);
}
if (!localImage) {
  localImage = './profile.png'
  localStorage.setItem('image', localImage)
};

// Init user local data
socket.emit('init', { username: localUsername, image: localImage });


socket.on('data', (data) => {
  console.log(data.length);
})