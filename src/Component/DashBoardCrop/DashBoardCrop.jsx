import React, { useEffect, useState } from 'react'
import './DashBoardCrop.scss'
import Nav from '../nav/Nav'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUserAuth } from "../../context/UserAuthContext";
import Progress from '../Progress/Progress';
import { DataGrid } from '@mui/x-data-grid';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Loder from '../Loder/Loder';
import Spinner from '../Spinner/Spinner';

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
    { field: 'Total', headerName: 'Total', width: 130, valueGetter: (params) =>
    `${'₹'} ${params.row.Total || '0'}`,},

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
    { field: 'Total', headerName: 'Total', width: 130,valueGetter: (params) =>
    `${'₹'} ${params.row.Total || '0'}` },

  ];

const DashBoardCrop = () => {
    const { user,getCropMarket,getFertilizerMarket,getCropTransaction,getFertilizerTransaction } =useUserAuth();
     
     const ref=collection(db,"crops")

     const[trans,setTrans] = useState([])
     const[fertrans,setFertrans] = useState([])

     const[cropMarket,setCropMarket] = useState()
     const[croporder,setCroporder ]= useState()
     const[fertilizerorder,setFertilizerorder] = useState(0)
     const[payout,setPayout] = useState(0)
     const[ferpay,setFerpay] = useState(0)

     const[transcat,setTransCat] = useState("Crop")



    useEffect(()=>{
        const getdata = async() =>{
            var data = await getCropTransaction()
            var ferdata = await getFertilizerTransaction()
            var marketcrop  =await getCropMarket()

             data = data
             marketcrop = marketcrop
             ferdata = ferdata
      

             await setCroporder(data.length)
             await setFertilizerorder(ferdata.length)
             
             var pay=0
             data.map((d)=>{
                 pay =pay+d.Total
             })
             setPayout(pay)

             pay=0
             await ferdata.map((fer)=>{
                 pay=pay+fer.Total
                
             })
             setFerpay(pay)

            await setTrans(data.map((document) => document))
            await setFertrans(ferdata.map((document) => document))
            await setCropMarket(marketcrop)
            await console.log(trans);

        }
         getdata()
    },[window.location.pathname=='/CropInfo'])
  return (
    <div className='dashboard_main'>
        <Nav/>
        {trans.length>0 && cropMarket && fertrans ? 
        <>
        <div className='dashboard_body'>
          <div className='dashboard_left'>

              <div className='dashboard_left_1'>
              <h1>Recent Transaction: Fertilizer</h1>
              <div style={{ height: 370, width: '100%',}}>
      <DataGrid
        rows={fertrans}
        getRowId ={(row) => row.transactionId}
        columns={columnsfer}
        pageSize={5}
        rowsPerPageOptions={[5]}
        scrollbarSize={0}
        initialState={{

          sorting: {
          
          sortModel: [
          
          {
          
          field: 'transactionId',
          
          sort: 'desc',
          
          },
          
          ],
          
          },
          
          }}
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(20, 74, 5, 0.6)",
            color: "#ffffff",
            fontSize: 20
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
            }
          }
        }}
      />
    </div>
              </div>

            <div className='dashboard_left_2'>
                  <h1>Recent Transaction: Crop</h1>

                  <div style={{ height: 370, width: '100%',}}>
      <DataGrid
        rows={trans}
        getRowId ={(row) => row.transactionId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        scrollbarSize={0}
        initialState={{

          sorting: {
          
          sortModel: [
          
          {
          
          field: 'transactionId',
          
          sort: 'desc',
          
          },
          
          ],
          
          },
          
          }}
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(20, 74, 5, 0.6)",
            color: "#ffffff",
            fontSize: 20
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
            }
          }
        }}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'transactionId',
                sort: 'desc',
              },
            ],
          },
        }}
      />
    </div>
           </div>

          </div>
          <div className='dashboard_right'>
            <div className='dashprofit'>
             <div className='profit'>
               <h1>Profit</h1>
               <h2>₹{(payout+ferpay)*10/100}</h2>
             </div>
             <div className='totalordercount'>
               <h1>Orders count</h1>
               <h2>{croporder+fertilizerorder}</h2>
             </div>
            </div>
            <div className='dashpayout'>
            <div className='totalpickupcount'>
               <h1>Crop Pickup</h1>
               <h2>{croporder}</h2>
             </div>
            <div className='payout'>
               <h1>Farmer Payout</h1>
               <h2>₹{payout}</h2>
             </div>
             
            </div>
            <div className='dashprogress'>
                <h2>Procurement Progress</h2>
              {cropMarket.map((crop,i)=>{
                  if(crop.owner!=user.shop || i>6)  return <div/>
                  var req = crop.quantity
                  var comp = crop.quantity - crop.reamining
                  return(
                    <div className='progresslist'>
                    <div className='cropname'>
                     <h4>{crop.name}</h4>
                    </div>
                    <div className='progressdoen'>
                        <Progress done={(comp*100/req).toFixed(1)}/>
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
        </> :<Loder/>}
        
    </div>
  )
}

export default DashBoardCrop