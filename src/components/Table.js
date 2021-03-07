import React, { useMemo, useState } from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination} from 'react-table';
import MOCKA_DATA from './MOCK_DATA.json';
import {COLUMNS} from './columns';
import './Table.css';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { GlobelFiltering } from './GlobelFiltering';


function Table() {
    
    const columns = useMemo(() => COLUMNS, []);
    const data =useMemo(()=> MOCKA_DATA, []);
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        gotoPage,
        state,
        pageOptions,
        pageCount,
        setGlobalFilter
        
      } = useTable({columns,data},useFilters, useGlobalFilter, useSortBy ,usePagination) ;
        
    const {globalFilter , pageIndex}=state    
     
      
    return (
        <div className='container'>
        <GlobelFiltering  filter={globalFilter } setFilter={setGlobalFilter} />
        <table {...getTableProps()}  className='table'>
           <thead>
               {headerGroups.map((headerGroup) =>(
                   <tr {...headerGroup.getHeaderGroupProps()} >
                    {headerGroup.headers.map((column)=>(
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} > 
                       
                           {column.render('Header')}
                         
                           <span  style={{float:'right'}}>
                            { column.isSortedDesc
                                ? <ArrowDownwardIcon/>
                                : <ArrowUpwardIcon/>
                              }
                           </span>
                         
                           
                         </th>
                    ))}
                   
               </tr>  
               ))}
                {headerGroups.map((headerGroup) =>(
                   <tr {...headerGroup.getHeaderGroupProps()} >
                    {headerGroup.headers.map((column)=>(
                        <th {...column.getHeaderProps()} className='columnFilter' > 
                      
                         
                           {column.canFilter? column.render('Filter'): null}
                         </th>
                    ))}
                   
               </tr>  
               ))}
             
           </thead> 
           <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className='tbody'>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} onClick={()=>console.log('td clicked', cell.row.original)}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        </table>
        <div className='table__pagination'>
          <span>
              Page {' '}
              {pageIndex +1}
              of  {' '} { pageOptions.length}
            
            
            </span>
          <ul className='pagination__list'>
              
            <li >
              <a href='#' onClick={()=>gotoPage(0)} className={`${!canPreviousPage?'disableLink' : null }`} > 
              {'<<'}</a>   
            </li>
            <li >
              <a href='#'onClick={()=>previousPage()} 
                 className={`${!canPreviousPage?'disableLink' : null }`}>{'<'}</a>  
            </li>
          
            {pageOptions.map((number)=>(
                <li key={number} onClick={()=>pageIndex === number? console.log('egal') : console.log(' notegal')  }>
                  <a href='#'onClick={()=>gotoPage(number)}  className={`${pageIndex === number?'activeLink' : null }`} >
                    {number + 1}
                  </a>
                  
                </li>
              ))} 
            
            
            <li >
              <a href='#'onClick={()=>nextPage()} 
              className={`${!canNextPage?'disableLink' : null }`}
              >{'>'} </a> 
            </li>
            <li >
              <a href='#'onClick={()=>gotoPage(pageCount - 1) } className={`${!canNextPage?'disableLink' : null }`}
            >{'>>'}</a> 
            </li>
            </ul>
        </div>
    </div>    
    )
}

export default Table
