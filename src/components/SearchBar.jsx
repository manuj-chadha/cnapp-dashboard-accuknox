import React from 'react'
export default function SearchBar({onSearch}){
  return <input onChange={e=>onSearch(e.target.value)} className="border px-3 py-2 rounded w-72 dark:bg-gray-800" placeholder="Search widgets..."/>
}