'use client';

import { CategoryType } from "@/src/models/category.model";
import TableComponent from "../../admin-dashboard/table.component";
import { useEffect, useState } from "react";
import { categoryService } from "@/src/lib/services";

export default function AdminCategoryPageComponent() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    useEffect(() => {
        const getCategories = async () => {
            const categories = await categoryService.getCategories();
            setCategories(categories);
        }
        getCategories();
    }, []);

    return (        
    <div className="justify-center items-center flex mt-36 flex-col w-full">
        {TablePage(categories)}
    </div>
    );
}

function TablePage(categories: CategoryType[]) {
    return(
        <TableComponent
        title="Users"
        fields={["Name", "Product size", "Is Active"]}
        objects={categories.map(category => ({
        data: [
        category.name,
        category.products.length.toString(),
        category.isActive ? "Yes" : "No"
        ],
        AccessCode: category.name,
        editButton: (accessCode) => {
            console.log("Edit user:", accessCode);
        },
        deleteButton: (accessCode) => {
            console.log("Delete user:", accessCode);
        }
        })
        )}
        addButton={() => (
            console.log("Add user")
        )}
        />
    )
}