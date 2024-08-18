import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth";
import {collection,addDoc, getDocs,doc,deleteDoc,updateDoc, getDoc, query, orderBy} from 'firebase/firestore'
import {auth,db} from "../config/firebase"
import axios from 'axios';

const userAuthContext=createContext();


export function UserAuthContextProvider({children}){
    const[user,setUser]= useState(false);
    const[cropdata,setCrop]=useState({})
    const userCollectionRef = collection(db,"users")
    // const shortTermCollectionRef = collection(db,"Short Term Crops")
    // const longTermCollectionRef = collection(db,"Long Term Crops")
    const cropsCollectionRef = collection(db,"crops")
    const pendingcropsCollectionRef = collection(db,"pending crops")
    const cropDashboardCollectionRef=query(collection(db,"crop dashboard"),orderBy("timestamp"))
    // const ref1 = query(collection(ref, "message"), orderBy("timestamp"));
    const fertilizerDashboardCollectionRef=collection(db,"fertilizer dashboard")
    const cropsMarketCollectionRef = collection(db,"crop market")
    const fertilizerMarketCollectionRef = collection(db,"fertilizer market")
    const schemeCollectionRef= collection(db,"schemes")
    const newsCollectionRef= collection(db,"news")
    const articleCollectionRef= collection(db,"article")
    const[cropMarketData,setCropMarket]=useState({})
    

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password).then(()=>{
            return "success"
        }).catch((error)=>{
            const errorCode=error.code
            return errorCode
            
        })
    }
    async function logIn(email,password){
        const url = 'http://localhost:8080/login';
        const data ={
        email:email,
        password:password
        } 
        const response = await axios.post(url, data);
        if(response.data.message==="success"){
            presentUser(data.email);
            return "success";
        }
        else{
            return response.data.message;
        }
            
        // return signInWithEmailAndPassword(auth,email,password).then(()=>{
        //     return "success"

        // }).catch((error)=>{
        //     const errorCode=error.code
        //     const errorMessage=error.message
        //     return errorCode
        // })
    }
    const logout =async()=>{
        setUser(false)
        // signOut(auth).then(() => {
        //    setUser(false)
        //   }).catch((error) => {
        //    console.log("failure");
        //   });
    }

    const presentUser = async(email) =>{
        const data= await getDocs(userCollectionRef);
        data.docs.map((currentUser)=>{
            if(currentUser.data().email === email)
            {
                setUser(currentUser.data())
                getCrop()
            }
        })
    }
    
const addUser = async(newUser) =>{
    const url = 'http://localhost:8080/signup';
    const data = newUser;
    const response = await axios.post(url, data)
    console.log('Success:', response);
    if(response.data.message==="success"){
        presentUser(data.email);
        return "success";
    }
    else{
        return response.data.message;
    }
      //await addDoc(userCollectionRef,newUser)
}



    const addCrop = async(crop) =>{
        await addDoc(cropsCollectionRef,crop)
    }

    const getCrop=async()=>{
    //     const data= await getDocs(cropsCollectionRef).then(result=>{
    //         console.log("line 119",result.docs);
    //         setCrop(result.docs)
    // // //       result.docs.map((onecrop) => {
    // // //         const url = 'http://localhost:8080/addCrop';
    // // //         axios.post(url, onecrop.data())
    // // // })
    
    //     })
    const url = 'http://localhost:8080/getAllCrops';
    const response = await axios.get(url);
    console.log("line 121",response.data.data);
    setCrop(response.data.data);

        // console.log("line 119",data.docs);
        //  setCrop(data.docs)
        //  console.log("line 112",data.docs);
        //return data

    }
    const addCropMarket = async(crop) =>{
        await addDoc(cropsMarketCollectionRef,crop)
    }

    const addFertilizerMarket = async(fertilizer) =>{
        await addDoc(fertilizerMarketCollectionRef,fertilizer)
    }

    const getCropMarket = async() =>{
//         const data1= await getDocs(cropsMarketCollectionRef).then(result=>{
//           result.docs.map((onecrop) => {
//             console.log("line 151",onecrop)
//             const url = 'http://localhost:8080/addCropListing';
//             axios.post(url, onecrop.data())
//     })
// })
const url = 'http://localhost:8080/getAllCropListing';
        const response = await axios.get(url);
        return response.data.data;
        // setCropMarket(data.docs)
    }
    
    const getFertilizerMarket = async() =>{ 
        const url = 'http://localhost:8080/getAllFertilizerListing';
        const response = await axios.get(url);
        console.log("line 151",response.data.data);
//                const data1= await getDocs(fertilizerMarketCollectionRef).then(result=>{
//           result.docs.map((onefertilizer) => {

//             console.log("line 151",onefertilizer)
//             const url = 'http://localhost:8080/addFertilizerListing';
//             axios.post(url, onefertilizer.data())
//     })
// })

       // return data
       return response.data.data;
    }

    const updateCropMarket = async(id,data) =>{
        await updateDoc(doc(db,"crop market",id),data)
    }
    const updateFertilizerMarket = async(id,data) =>{
        await updateDoc(doc(db,"fertilizer market",id),data)
    }
    const deleteCropMarket = async (id) =>{
        await deleteDoc(doc(db,"crop market",id))
    }
    const deleteFertilizerMarket = async (id) =>{
        await deleteDoc(doc(db,"fertilizer market",id))
    }

    const deletePendingcrop = async(id) =>{
        await deleteDoc(doc(db,"pending crops",id))
    }
    const addScheme = async(scheme) =>{
        await addDoc(schemeCollectionRef,scheme)
    }
    const getScheme = async() =>{
        //const data=await getDocs(schemeCollectionRef)
        // console.log("line 190",data.docs);
        const url = 'http://localhost:8080/getAllScheme';
        const response = await axios.get(url);
    //     const data1= await getDocs(schemeCollectionRef).then(result=>{

            
    //       result.docs.map((oneschema) => {

    //         console.log("line 151",oneschema)
    //         const url = 'http://localhost:8080/addScheme';
    //         axios.post(url, oneschema.data())
    // })
// })
        return response.data.data
    }

    const addNews = async(news) =>{
        await addDoc(newsCollectionRef,news)
    }
    const getNews= async() =>{
            // const data1= await getDocs(newsCollectionRef).then(result=>{
                // const url = 'http://localhost:8080/addNews';
                //         axios.post(url, result.docs[0].data())
            
    //       result.docs.map((onenews) => {

    //         console.log("line 151",onenews)
    //         const url = 'http://localhost:8080/addNews';
    //         axios.post(url, onenews.data())
    // })
// })
const url = 'http://localhost:8080/getAllNews';
        const response = await axios.get(url);
        return response.data.data
    }
    const addArticle = async(article) =>{
        await addDoc(articleCollectionRef,article)
    }
    const getArticle= async() =>{
        // const data=await getDocs(articleCollectionRef)
        // console.log("line 230",data.docs);

        // const data1= await getDocs(articleCollectionRef).then(result=>{
                // const url = 'http://localhost:8080/addArticle';
                //         axios.post(url, result.docs[0].data())
            
    //       result.docs.map((onenews) => {
    //         console.log("line 151",onenews)
    //         const url = 'http://localhost:8080/addArticle';
    //         axios.post(url, onenews.data())
    // })
// })
const url = 'http://localhost:8080/getAllArticle';
const response = await axios.get(url);
console.log("line 244",response.data.data);
return response.data.data
    }

    const makeDeal = async(id,data)=>{
        const cropInfo= await (await getDoc(doc(db,"crop market",id))).data()
        const price=cropInfo.reamining-data.quantity;
        updateCropMarket(id,{reamining:price})
        const transaction={transactionId:id,
                           cropName:cropInfo.name,
                           sellerName:data.farmerName,
                           price:cropInfo.offerPrice,
                           Quantity:data.quantity,
                           Total:data.quantity*cropInfo.offerPrice,
                           timestamp:new Date(),
                           owner:data.owner
                        }
        await addDoc(cropDashboardCollectionRef,transaction)
    }

    const buyFertilizer = async(id,data)=>{
        const fertilizerInfo= await (await getDoc(doc(db,"fertilizer market",id))).data()
        const transaction={transactionId:id,
                           cropName:fertilizerInfo.name,
                           buyerName:data.farmerName,
                           price:fertilizerInfo.offerPrice,
                           Quantity:data.quantity,
                           Total:data.quantity*fertilizerInfo.offerPrice,
                           timestamp:new Date(),
                           owner:data.owner
                        }
        await addDoc(fertilizerDashboardCollectionRef,transaction)
    }

    const getCropTransaction = async() =>{
        const data=await getDocs(cropDashboardCollectionRef)
        console.log(data.docs);
        return data
    }

    const getFertilizerTransaction = async() =>{
        const data=await getDocs(fertilizerDashboardCollectionRef)
        return data
    }
   
    // const uploadShortTermCropDetails = async(newData) =>{
    //     await addDoc(shortTermCollectionRef,newData)
    //   }
    // const uploadLongTermCropDetails = async(newData) =>{
    //     await addDoc(longTermCollectionRef,newData)
    //   }
   
    

    // useEffect(()=>{
    //     const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
    //         presentUser(currentUser.email)
    //     })
    //     return ()=>{
    //         unsubscribe();
    //     }

    // },[]);
   return <userAuthContext.Provider value={{user,setUser,signUp,logIn,addUser,addCrop,getCrop,cropdata,addCropMarket,getCropMarket,cropMarketData,updateCropMarket,deleteCropMarket,addFertilizerMarket,getFertilizerMarket,deleteFertilizerMarket,updateFertilizerMarket,makeDeal,buyFertilizer,getCropTransaction,getFertilizerTransaction,addScheme,getScheme,addArticle,getArticle,addNews,getNews,logout,deletePendingcrop}}>{children}</userAuthContext.Provider>
}


export function useUserAuth(){
    return useContext(userAuthContext)
}