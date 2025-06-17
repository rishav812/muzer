"use client";

import withAuth from "../components/isAuth";
import StreamView from "../components/StreamView";

const creatorId = "8f33afd9-1784-423c-ba18-4a222ef8f1b9"; // Example creator ID, replace with actual ID

function Dashboard() {
  return <StreamView creatorId={creatorId}/>
}

export default withAuth(Dashboard);
