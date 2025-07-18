'use client';

export default function NotificationComponent() {
    return (
        <div className="fixed top-0 right-0 m-4">
            <div className="bg-white text-white w-46 rounded-4xl p-4">
                {/** ICON */}
                <img width="25" height="25" className="absolute ml-4 mb-4" src="https://img.icons8.com/ios/50/error--v1.png" alt="error--v1"/>
                <p className="text-red-500 ml-14">Notification</p>
            </div>
        </div>
    );
}