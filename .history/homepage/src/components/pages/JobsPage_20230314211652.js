import React from 'react'
import { Pagination } from 'react-bootstrap'
import PaginationEllipsis from 'react-bootstrap/lib/PaginationEllipsis'


export default function JobsPage({page, setPage, hasNextPage}) {
  return (

    <Pagination> 

     {page !== 1 && <Pagination.Prev/>}
     {page !==1 &&<Pagination.Item> 1 </Pagination.Item>}
     { page > 2 && <PaginationEllipsis />}
     {page >2 &&<Pagination.Item> {page -1 } </Pagination.Item>}
     <Pagination.Item active> {page}</Pagination.Item>
     {hasNextPage && <Pagination.Item> {page + 1}</Pagination.Item>}
     {hasNextPage && <Pagination.Next/>}
    </Pagination>
  )
}