'use client';

type TableObject = {
  data: string[],
  editButton: (email: string) => void,
  deleteButton: (email: string) => void,
  AccessCode: string 
}

export type Table = {
  title: string,
  fields: string[],
  objects: TableObject[],
  addButton: () => void,
}


export default function TableComponent(table: Table) {
    return(
        <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="pl-5 text-sm font-semibold text-white text-left">
                {table.title}
                <button onClick={table.addButton} className="float-right bg-[#0e786a] text-white p-2 rounded-md hover:bg-[#139f8b] transition-all duration-300 ease-in-out">Add</button>
            </caption>
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 ">
            <tr>
            {
                table.fields.map((field, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                        {field}
                    </th>
                ))
            }
            </tr>
        </thead>
        <tbody>
        {table.objects.map((object, index) => (
            <tr key={index} className="...">
            {object.data.map((item, i) => (
                <td key={i} className="px-6 py-4">{item}</td>
            ))}
            <td className="px-6 py-4">
                <a onClick={() => object.editButton(object.AccessCode)} className="... text-blue-600 hover:cursor-pointer">Edit</a>
            </td>
            <td className="px-6 py-4">
                <a onClick={() => object.deleteButton(object.AccessCode)} className="... text-red-600 hover:cursor-pointer">Delete</a>
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    )
}