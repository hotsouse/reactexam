import React from "react";


export default function Notifications() {
const requestPermission = async () => {
const permission = await Notification.requestPermission();
if (permission === "granted") {
new Notification("StudyHub Notification", {
body: "Напоминание: пора учиться!",
});
}
};


return (
<div>
<h2>Notifications</h2>
<button onClick={requestPermission}>Enable Web Push</button>
</div>
);
}