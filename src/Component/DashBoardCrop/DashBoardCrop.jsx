import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import Footer from "../../Component/Footer/Footer";
import { db } from '../../config/firebase';
import { useUserAuth } from "../../context/UserAuthContext";
import Nav from '../nav/Nav';
import Progress from '../Progress/Progress';
import './DashBoardCrop.scss';
import { Icon } from '@iconify/react';
import Loder from "../Loder/Loder";
import chevronLeft from '@iconify-icons/mdi/chevron-left';
import chevronRight from '@iconify-icons/mdi/chevron-right';

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
const columns = [
  {
    field: 'transactionId',
    headerName: 'Transaction Date',
    width: 200,
    valueGetter: (params) => {
      const timestamp = params.row.timestamp;
      if (timestamp && timestamp.seconds) {
        const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1e6);
        return new Date(milliseconds).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
      }
      return '6/2/2022, 11:43:26 AM'; // Default value if timestamp is missing
    }
  },
  { field: 'cropName', headerName: 'CropName', width: 250 },
  {
    field: 'sellerName',
    headerName: 'Seller Name',
    width: 140,
    valueGetter: (params) => capitalizeFirstLetter(params.row.sellerName)
  },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'Quantity', headerName: 'Quantity', width: 100 },
  {
    field: 'Total', headerName: 'Total', width: 130, valueGetter: (params) =>
      `${'₹'} ${params.row.Total || '0'}`,
  },

];

const columnsfer = [
  {
    field: 'transactionId',
    headerName: 'Transaction Date',
    width: 200,
    valueGetter: (params) => {
      const timestamp = params.row.timestamp;
      if (timestamp && timestamp.seconds) {
        const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1e6);
        return new Date(milliseconds).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
      }
      return '6/2/2022, 11:43:26 AM'; // Default value if timestamp is missing
    }
  },
  { field: 'cropName', headerName: 'Crop Name', width: 250 },
  {
    field: 'buyerName',
    headerName: 'Buyer Name',
    width: 140,
    valueGetter: (params) => capitalizeFirstLetter(params.row.buyerName)
  },
  { field: 'price', headerName: 'Price/Unit', width: 120 },
  { field: 'Quantity', headerName: 'Quantity', width: 100 },
  {
    field: 'Total', headerName: 'Total', width: 130, valueGetter: (params) =>
      `${'₹'} ${params.row.Total || '0'}`
  },

];





const DashBoardCrop = () => {
  const { user, getCropMarket, getFertilizerMarket, getCropTransaction, getFertilizerTransaction } = useUserAuth();

  const ref = collection(db, "crops")

  const [trans, setTrans] = useState([])
  const [fertrans, setFertrans] = useState([])
  const [cropMarket, setCropMarket] = useState()
  const [croporder, setCroporder] = useState()
  const [fertilizerorder, setFertilizerorder] = useState(0)
  const [payout, setPayout] = useState(0)
  const [ferpay, setFerpay] = useState(0)
  const [transcat, setTransCat] = useState("Crop")
  const [loading, setLoading] = useState(true);  // Step 1: Loading state



  useEffect(() => {
    const getdata = async () => {
      try {
        setLoading(true)
        var data = await getCropTransaction()
        var ferdata = await getFertilizerTransaction()
        var marketcrop = await getCropMarket()

        //data = data
        marketcrop = marketcrop
        ferdata = ferdata

        var cropOrder = 0;
        data.map((d) => {
          if (user.shop === d.owner) {
            cropOrder = cropOrder + 1;
          }
        })
        var fertilizerOrder = 0;
        await ferdata.map((fer) => {
          if (user.shop === fer.owner) {
            fertilizerOrder = fertilizerOrder + 1;
          }
        })
        console.log(fertilizerOrder);


        await setCroporder(cropOrder)
        await setFertilizerorder(fertilizerOrder)

        var pay = 0
        data.map((d) => {
          if (user.shop === d.owner) {
            pay = pay + d.Total
          }
        })
        setPayout(pay)

        pay = 0
        await ferdata.map((fer) => {
          if (user.shop === fer.owner) {
            pay = pay + fer.Total
          }
        })
        setFerpay(pay)
        // await setTrans(data);
        console.log(ferdata);
        console.log("Filtered Crop Transaction Data:", data.filter((document) => document.owner === user.shop));
        console.log("Filtered Fertilizer Transaction Data:", ferdata.filter((document) => document.owner === user.shop));
        const transdata = data.filter((document) => document.owner === user.shop);
        const fertransdata = ferdata.filter((document) => document.owner === user.shop)
        await setTrans(transdata);
        await setFertrans(fertransdata);
        await setCropMarket(marketcrop)
        await console.log(data);


        const filteredCropData = data.filter((document) => document.owner === user.shop);
        const filteredFertilizerData = ferdata.filter((document) => document.owner === user.shop);

        // Log the filtered data and their length
        console.log("Filtered Crop Transaction Data:", filteredCropData);
        console.log("Filtered Crop Transaction Records:", filteredCropData.length);

        console.log("Filtered Fertilizer Transaction Data:", filteredFertilizerData);
        console.log("Filtered Fertilizer Transaction Records:", filteredFertilizerData.length);

        // Set the state with the filtered data
        setTrans(filteredCropData);
        setFertrans(filteredFertilizerData);
        setCropMarket(marketcrop);
      }
      catch (error) {

      }
      finally {
        setLoading(false);
      }
    }
    getdata()
  }, [])


  

  const fertilizerColumns = React.useMemo(() => [
    {
      Header: 'Transaction Date',
      accessor: row => new Date((row.timestamp.seconds * 1000) + (row.timestamp.nanoseconds / 1e6)).toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      }),
    },
    { Header: 'Fetilizer Name', accessor: 'cropName' },
    { Header: 'Buyer Name', accessor: row => capitalizeFirstLetter(row.buyerName) },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Quantity', accessor: 'Quantity' },
    { Header: 'Total', accessor: row => `₹ ${row.Total || '0'}` },
  ], []);

  const cropColumns = React.useMemo(() => [
    {
      Header: 'Transaction Date',
      accessor: row => new Date((row.timestamp.seconds * 1000) + (row.timestamp.nanoseconds / 1e6)).toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      }),
    },
    { Header: 'Crop Name', accessor: 'cropName' },
    { Header: 'Seller Name', accessor: row => capitalizeFirstLetter(row.sellerName) },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Quantity', accessor: 'Quantity' },
    { Header: 'Total', accessor: row => `₹ ${row.Total || '0'}` },
  ], []);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of rows, use page for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns: cropColumns, data: trans, initialState: { pageIndex: 0, pageSize: 5 } }, // Default page size of 5
    useSortBy,
    usePagination
  );


  // const {
  //   getTableProps: getFerTableProps,
  //   getTableBodyProps: getFerTableBodyProps,
  //   headerGroups: ferHeaderGroups,
  //   rows: ferRows,
  //   prepareRow: prepareFerRow,
  // } = useTable(
  //   { columns: fertilizerColumns, data: fertrans },
  //   useSortBy,
  //   usePagination
  // );


  const {
    getTableProps: getFerTableProps,
    getTableBodyProps: getFerTableBodyProps,
    headerGroups: ferHeaderGroups,
    page: ferPage, // Instead of rows, use page for pagination
    prepareRow: prepareFerRow,
    canPreviousPage: canFerPreviousPage,
    canNextPage: canFerNextPage,
    pageOptions: ferPageOptions,
    nextPage: ferNextPage,
    previousPage: ferPreviousPage,
    state: { pageIndex: ferPageIndex, pageSize: ferPageSize },
    setPageSize: setFerPageSize,
  } = useTable(
    { columns: fertilizerColumns, data: fertrans, initialState: { pageIndex: 0, pageSize: 5 } }, // Default page size of 5
    useSortBy,
    usePagination
  );




  if (loading) {
    // return <div>Loading...</div>;
   return <Loder/>// You can replace this with a spinner component or custom loader
  }
  return (
    <div className='dashboard_main'>
      <Nav />
      
          <div className='dashboard_body'>
            <div className='dashboard_left'>

              <div className='dashboard_left_1'>
                <h1>Recent Transaction: Fertilizer</h1>
                <div >




                  <div className="table-container">
                    <table {...getFerTableProps()}>
                      <thead>
                        {ferHeaderGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getFerTableBodyProps()}>
                        {ferPage.map(row => {
                          prepareFerRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* Pagination for Fertilizer Table */}
                    <div className="pagination">
                      <button  style={{width:"80px", backgroundColor:"white"}} onClick={() => ferPreviousPage()} disabled={!canFerPreviousPage}><Icon style={{height:"30px", width:"60px",}} icon="mdi:chevron-left" /></button>
                      <span className="page-info">
                        Page {ferPageIndex + 1} of {ferPageOptions.length} | <strong>Total Fertilizer Transactions: {fertrans.length}</strong>
                      </span>
                      <button style={{width:"80px", backgroundColor:"white"}} onClick={() => ferNextPage()} disabled={!canFerNextPage}><Icon style={{height:"30px", width:"60px"}} icon="mdi:chevron-right" /></button>
                    </div>
                  </div>


                </div>
              </div>

              <div className='dashboard_left_2'>
                <h1>Recent Transaction: Crop</h1>

                <div >


                  <div className="table-container">
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* Add Pagination */}
                    <div className="pagination">
                      <button style={{width:"80px", backgroundColor:"white"}}  onClick={() => previousPage()} disabled={!canPreviousPage}><Icon style={{height:"30px", width:"60px",}} icon="mdi:chevron-left" /></button>
                      <span className="page-info">
                        Page {pageIndex + 1} of {pageOptions.length} | <strong>Total Crop Transactions: {rows.length}</strong>
                      </span>
                      <button style={{width:"80px", backgroundColor:"white"}} onClick={() => nextPage()} disabled={!canNextPage}><Icon style={{height:"30px", width:"60px"}} icon="mdi:chevron-right" /></button>
                    </div>
                  </div>


                </div>
              </div>

            </div>
            <div className='dashboard_right'>
              <div className='dashprofit'>
                <div className='profit'>
                  <h1 style={{fontWeight:"bolder"}}>Profit</h1>
                  <h2>₹{(payout + ferpay) * 10 / 100}</h2>
                </div>
                <div className='totalordercount'>
                  <h1 style={{fontWeight:"bolder"}}>Orders count</h1>
                  <h2>{croporder + fertilizerorder}</h2>
                </div>
              </div>
              <div className='dashpayout'>
                <div className='totalpickupcount'>
                  <h1 style={{fontWeight:"bolder"}}>Crop Pickup</h1>
                  <h2>{croporder}</h2>
                </div>
                <div className='payout'>
                  <h1 style={{fontWeight:"bolder"}}>Farmer Payout</h1>
                  <h2>₹{payout}</h2>
                </div>

              </div>
              <div className='dashprogress'>
                <h2 >Procurement Progress</h2>
                {cropMarket.map((crop, i) => {
                  if (crop.owner != user.shop) return <div />
                  var req = crop.quantity
                  var comp = crop.quantity - crop.reamining
                  return (
                    <div className='progresslist'>
                      <div className='cropname'>
                        <h4>{crop.name}</h4>
                      </div>
                      <div className='progressdoen'>
                        <Progress done={(comp * 100 / req).toFixed(1)} />
                      </div>

                      <div className='prgressinfo'>
                        <h6>Procured Crop: {(comp)}Kg</h6>
                        <h6>Needed:{req}Kg</h6>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <Footer />
        

    </div>
  )
}

export default DashBoardCrop