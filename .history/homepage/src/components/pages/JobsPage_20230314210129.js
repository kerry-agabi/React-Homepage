import React from 'react'
import { Pagination } from 'react-bootstrap'


export default function JobsPage() {
  return (

    <Pagination> 

     <Pagination.Prev/>
     <Pagination.Item> {page - 1}</Pagination.Item>
     <Pagination.Item> {page}</Pagination.Item>
     <Pagination.Item> {page + 1}</Pagination.Item>
     <Pagination.Next/>
    </Pagination>
  )
}
