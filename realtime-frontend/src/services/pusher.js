import Pusher from "pusher-js";

if (!process.env.REACT_APP_PUSHER_APP_KEY) {
  throw new Error("Your pusher app key is not found on your .env!");
}

if (!process.env.REACT_APP_PUSHER_CLUSTER) {
  throw new Error("Your pusher app cluster is not found on your .env!");
}


const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  forceTLS: true,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
});

export default pusher;