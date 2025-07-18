'use client';

export type NotificationComponentProps = {
    iconPath: string;
    message: string;
}

export default function NotificationComponent(prop : NotificationComponentProps) {
    return (
        <div className="fixed top-0 right-0 m-4">
            <div className="bg-white text-white w-52 rounded-4xl p-4">
                <img src={prop.iconPath} alt="icon" className="w-6 h-6" />
                <div className="text-black">{prop.message}</div>
            </div>
        </div>
    );
}