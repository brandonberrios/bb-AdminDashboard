import React, { useEffect } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from 'react';

const Widget = ({ type }) => {
  //const [amount, setAmount] =useState(null);
  //const [diff, setDiff] =useState(null);
  let data;


  //temproary 
 const amount = 100;
 const diff = 20;
  
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: <PersonOutlineOutlinedIcon 
                        className="icon" 
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)"
                        }}
                    />,
                
            };
            break;
        case "order":
            data = {
                 title: "ORDERS",
                 isMoney: false,
                 link: "View all orders",
                 icon: <ShoppingCartOutlinedIcon className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }} 
                    />,
                    
                };
            break;

        case "earning":
            data = {
                title: "EARININGS",
                isMoney: true,
                link: "View net earnings",
                icon: <MonetizationOnOutlinedIcon className="icon" 
                       style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                     />,
                    
                };
            break;

        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: <AccountBalanceWalletOutlinedIcon className="icon" 
                       style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                     />,
                    
                };
            break;
        default:
            break;
    }

useEffect(()=>{
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      
      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
      


    };
    fetchData()
},[])

  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
                {data.isMoney && "$"} {amount}
            </span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  );
};

export default Widget;