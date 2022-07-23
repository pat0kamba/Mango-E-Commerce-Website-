import React from "react";
import {Container, Grid, Button, Typography} from "@mui/material";
import {useLocation, Link} from "react-router-dom";
import EmptyWishList from "./EmptyWishList.js";

export default function Wishlist()
{   
    const location = useLocation();
    const products = location.state.products;
    console.log(products) 
    return(
    <>
    {products.length === 0 ?<EmptyWishList />: <Container maxWidth="xlg" sx={{my:"10px"}} >
            <Grid container spacing={1} >
                {
                    products.map((item, id)=>{
                        return(
                            <Grid item xs={12} md={3} key={id} sx={{height:"100%"}}>
                                <img src={item.imageUrl} style={{width:"100%", height:"80%"}} alt="product_img" />
                                <Typography variant="caption" paragraph align="center">{item.name}</Typography>
                                <Typography variant="caption" paragraph gutterBottom  align="center" sx={{color:"red"}}>US${item.price}</Typography>
                                <Link to="#" style={{textDecoration:"none"}}><Button variant="outlined" color="secondary" fullWidth>Add to shopping bag</Button></Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
       </Container> 
       
    }
    </>
    )
};

