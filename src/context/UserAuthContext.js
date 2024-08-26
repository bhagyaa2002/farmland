import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc, query, orderBy } from 'firebase/firestore'
import { auth, db } from "../config/firebase"
import axios from 'axios';
import CryptoJS from 'crypto-js';

const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(false);
    const [cropdata, setCrop] = useState({})
    //const userCollectionRef = collection(db,"users")
    // const shortTermCollectionRef = collection(db,"Short Term Crops")
    // const longTermCollectionRef = collection(db,"Long Term Crops")
    const cropsCollectionRef = collection(db, "crops")
    const pendingcropsCollectionRef = collection(db, "pending crops")
    const cropDashboardCollectionRef = query(collection(db, "crop dashboard"), orderBy("timestamp"))
    // const ref1 = query(collection(ref, "message"), orderBy("timestamp"));
    const fertilizerDashboardCollectionRef = collection(db, "fertilizer dashboard")
    const cropsMarketCollectionRef = collection(db, "crop market")
    const fertilizerMarketCollectionRef = collection(db, "fertilizer market")
    const schemeCollectionRef = collection(db, "schemes")
    const newsCollectionRef = collection(db, "news")
    const articleCollectionRef = collection(db, "article")
    const [cropMarketData, setCropMarket] = useState({})


    // function signUp(email,password){
    //     return createUserWithEmailAndPassword(auth,email,password).then(()=>{
    //         return "success"
    //     }).catch((error)=>{
    //         const errorCode=error.code
    //         return errorCode

    //     })
    // }
    async function logIn(email, password) {
        const url = 'http://localhost:8080/login';
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();
        const lowerCaseEmail = email.toLowerCase();
        const data = {
            email: lowerCaseEmail,
            password: encryptedPassword
        }
        console.log("password",encryptedPassword);
        
        const response = await axios.post(url, data);
        if (response.data.message === "success") {
            // presentUser(data.email);
            setUser(response.data.data);
            //localStorage.setItem('user', JSON.stringify(response.data.data));
            sessionStorage.setItem('user', JSON.stringify(response.data.data));
            getCrop();
            return "success";
        }
        else {
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
    const logout = async () => {
        setUser(false)
        //localStorage.removeItem('user')
        sessionStorage.clear();
        // signOut(auth).then(() => {
        //    setUser(false)
        //   }).catch((error) => {
        //    console.log("failure");
        //   });
    }

    // const presentUser = async(email) =>{
    //     const data= await getDocs(userCollectionRef);
    //     data.docs.map((currentUser)=>{
    //         if(currentUser.data().email === email)
    //         {
    //             setUser(currentUser.data())
    //             getCrop()
    //         }
    //     })
    // }

    const addUser = async (newUser) => {
        const url = 'http://localhost:8080/signup';
        console.log("line 96",newUser)
        const encryptedPassword = CryptoJS.AES.encrypt(newUser.password, 'your-secret-key').toString();
        const lowerCaseEmail = newUser.email.toLowerCase();
        newUser.email=lowerCaseEmail;
        newUser.password=encryptedPassword;
        const data = newUser;
        console.log("line 103",data);
        const response = await axios.post(url, data)
        console.log('Success:', response);
        if (response.data.message === "success") {
            //presentUser(data.email);
            sessionStorage.setItem('user', JSON.stringify(response.data.data));
            return "success";
        }
        else {
            //localStorage.setItem('user', JSON.stringify(response.data.data))
            // sessionStorage.setItem('user', JSON.stringify(response.data.data));
            return response.data.message;
        }
        //await addDoc(userCollectionRef,newUser)
    }



    const addCrop = async (crop) => {
        const url = 'http://localhost:8080/addCrop';
                axios.post(url,crop);
        // await addDoc(cropsCollectionRef, crop)
    }
    const addPendingCrop = async (crop) => {
        console.log(crop);
        const url = 'http://localhost:8080/addPendingCrop';
                axios.post(url,crop);
    }

    const getCrop = async () => {
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
        setCrop(response.data.data);

        // console.log("line 119",data.docs);
        //  setCrop(data.docs)
        //  console.log("line 112",data.docs);
        //return data

    }

    const getPendingCrop = async () => {
        //     const data= await getDocs(cropsCollectionRef).then(result=>{
        //         console.log("line 119",result.docs);
        //         setCrop(result.docs)
        // // //       result.docs.map((onecrop) => {
        // // //         const url = 'http://localhost:8080/addCrop';
        // // //         axios.post(url, onecrop.data())
        // // // })

        //     })
        const url = 'http://localhost:8080/getAllPendingCrops';
        const response = await axios.get(url);
        return response.data.data;

        // console.log("line 119",data.docs);
        //  setCrop(data.docs)
        //  console.log("line 112",data.docs);
        //return data

    }


    const addCropMarket = async (crop) => {
        await addDoc(cropsMarketCollectionRef, crop)
    }

    const addFertilizerMarket = async (fertilizer) => {
        await addDoc(fertilizerMarketCollectionRef, fertilizer)
    }

    const getCropMarket = async () => {
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

    const getFertilizerMarket = async () => {
        const url = 'http://localhost:8080/getAllFertilizerListing';
        const response = await axios.get(url);
        console.log("line 151", response.data.data);
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

    const getOneFertilizerMarket = async (_id) => {
        const url = 'http://localhost:8080/getOneFertlizerListing';
        const data={
            _id:_id
        }
        const response = await axios.post(url,data);
        console.log("line 151", response.data.data);
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

    const updateCropMarket = async (id, data) => {
        await updateDoc(doc(db, "crop market", id), data)
    }
    const updateFertilizerMarket = async (id, data) => {
        await updateDoc(doc(db, "fertilizer market", id), data)
    }
    const deleteCropMarket = async (id) => {
        await deleteDoc(doc(db, "crop market", id))
    }
    const deleteFertilizerMarket = async (id) => {
        await deleteDoc(doc(db, "fertilizer market", id))
    }

    const deletePendingcrop = async (cropname) => {
        console.log("line 217",cropname);
        const url = 'http://localhost:8080/deletePendingCrop';
                axios.post(url,cropname);
       // await deleteDoc(doc(db, "pending crops", id))
    }
    const addScheme = async (scheme) => {
        await addDoc(schemeCollectionRef, scheme)
    }
    const getScheme = async () => {
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

    const addNews = async (news) => {
        await addDoc(newsCollectionRef, news)
    }
    const getNews = async () => {
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
    const addArticle = async (article) => {
        await addDoc(articleCollectionRef, article)
    }
    const getArticle = async () => {
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
        console.log("line 244", response.data.data);
        return response.data.data
    }

    const makeDeal = async (id, data) => {
        const cropInfo = await (await getDoc(doc(db, "crop market", id))).data()
        const price = cropInfo.reamining - data.quantity;
        updateCropMarket(id, { reamining: price })
        const transaction = {
            transactionId: id,
            cropName: cropInfo.name,
            sellerName: data.farmerName,
            price: cropInfo.offerPrice,
            Quantity: data.quantity,
            Total: data.quantity * cropInfo.offerPrice,
            timestamp: new Date(),
            owner: data.owner
        }
        await addDoc(cropDashboardCollectionRef, transaction)
    }

    const buyFertilizer = async (id, data) => {
        //const fertilizerInfo = await (await getDoc(doc(db, "fertilizer market", id))).data()
        console.log("line 328",id);
        const fertilizerInfo = await getOneFertilizerMarket(id);
        const date = new Date();
        const seconds = Math.floor(date.getTime() / 1000).toString();
    const nanoseconds = (date.getMilliseconds() * 1e6).toString();
    const timestamp = {seconds,nanoseconds};
        const transaction = {
            transactionId: id,
            cropName: fertilizerInfo.name,
            buyerName: data.farmerName,
            price: fertilizerInfo.offerPrice,
            Quantity: data.quantity,
            Total: data.quantity * fertilizerInfo.offerPrice,
            timestamp: timestamp,
            owner: data.owner
        }
        const url = 'http://localhost:8080/addFertilizerOrderHistory';
        axios.post(url, transaction)
       // await addDoc(fertilizerDashboardCollectionRef, transaction)
    }

    const getCropTransaction = async () => {
        // const data=await getDocs(cropDashboardCollectionRef)
        // console.log("line 304",data.docs);

        //     const data1= await getDocs(cropDashboardCollectionRef).then(result=>{
        //             // const url = 'http://localhost:8080/addCropOrderHistory';
        //             //         axios.post(url, result.docs[0].data())

        //       result.docs.map((oneCropTransaction) => {
        //         console.log("line 151",oneCropTransaction)
        //         const url = 'http://localhost:8080/addCropOrderHistory';
        //         axios.post(url, oneCropTransaction.data())
        // })
        // })
        //         return data
        const url = 'http://localhost:8080/getAllCropOrderTransaction';
        const response = await axios.get(url);
        console.log("line 319", response.data.data);
        return response.data.data
    }

    const getFertilizerTransaction = async () => {
        const data = await getDocs(fertilizerDashboardCollectionRef)

        // const data1= await getDocs(fertilizerDashboardCollectionRef).then(result=>{
        //                     // const url = 'http://localhost:8080/addFertilizerOrderHistory';
        //                     //         axios.post(url, result.docs[0].data())

        //               result.docs.map((oneCropTransaction) => {
        //                 console.log("line 151",oneCropTransaction)
        //                 const url = 'http://localhost:8080/addFertilizerOrderHistory';
        //                 axios.post(url, oneCropTransaction.data())
        //         })
        //     })
        // return data
        const url = 'http://localhost:8080/getAllFertilizerOrderTransaction';
        const response = await axios.get(url);
        console.log("line 339", response.data.data);
        return response.data.data
    }

    // const uploadShortTermCropDetails = async(newData) =>{
    //     await addDoc(shortTermCollectionRef,newData)
    //   }
    // const uploadLongTermCropDetails = async(newData) =>{
    //     await addDoc(longTermCollectionRef,newData)
    //   }

   

    useEffect(() => {
        //     const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
        //         presentUser(currentUser.email)
        //     })
        //     return ()=>{
        //         unsubscribe();
        //     }
        //const storedUser = localStorage.getItem('user');
        console.log("line 379", sessionStorage.getItem('user'));
        const storedUser= sessionStorage.getItem('user');
        if (storedUser) {

        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error('Error parsing stored user:', error);
            // Handle the error (e.g., clear the invalid data or show a message to the user)
            sessionStorage.removeItem('user'); // Optionally remove invalid data
        }
    }

    }, []);
    return <userAuthContext.Provider value={{ user, setUser, logIn, addUser, addCrop, addPendingCrop, getCrop, getPendingCrop, cropdata, addCropMarket, getCropMarket, cropMarketData, updateCropMarket, deleteCropMarket, addFertilizerMarket, getFertilizerMarket, deleteFertilizerMarket, updateFertilizerMarket, makeDeal, buyFertilizer, getCropTransaction, getFertilizerTransaction, addScheme, getScheme, addArticle, getArticle, addNews, getNews, logout, deletePendingcrop }}>{children}</userAuthContext.Provider>
}


export function useUserAuth() {
    return useContext(userAuthContext)
}