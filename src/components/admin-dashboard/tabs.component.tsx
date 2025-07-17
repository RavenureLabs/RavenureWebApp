'use client';

import { useState } from "react";

export type Tab = {
    fields: TabField[];
}

export type TabField = {
    name: string;
    click: () => void;
}

export default function TabsComponent(tab: Tab) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                {tab.fields.map((field, index) => (
                    <li className="me-2" key={index}>
                        <a
                            onClick={() => {
                                setActiveIndex(index);
                                field.click();
                            }}
                            className={`inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
                                activeIndex === index
                                    ? "text-blue-600 border-blue-600 dark:text-blue-500"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }`}
                        >
                            {field.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}