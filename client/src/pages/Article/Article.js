import React from 'react';
import {Typography, Grid, Box, Container, Button} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {cartActions} from "../../store/cartSlice.js";
import {useRef} from "react";
import "../../styles/Product.css";


export default function Article(props)
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wish = useSelector((state)=>state.cart.wish);
    const likeRef = useRef(0);
    let description;
    let image_src;
    let price;
    let name;
    let article_id;
    let article_size;
    let _color="#ccc";
    const handleItem = (describe, image, tag, theId, theName, theSize)=>{
        description = describe;
        image_src = image;
        price = tag;
        article_id = theId;
        name = theName;
        article_size = theSize

        navigate(`/selling/${props.category.toLowerCase()}/${props.sub_category.toLowerCase()}/${name}`, {state:{name:name, price:price, imageUrl:image_src, description:description, category:props.category, sub_category:props.sub_category, id:article_id, size:article_size}});
    }
   
    const handleClickSize = (theName, tag, image, theSize, theId )=>{
        dispatch(cartActions.addToCart({
            name:theName,
            price:tag,
            imageUrl:image,
            size:theSize,
            id:theId
                }));

        dispatch(cartActions.displayCart());
    }
       
    const handleAddWish = (theName, tag, image, theId)=>{
        dispatch(cartActions.addToWishlist({
            name:theName,
            price:tag,
            imageUrl:image,
            id:theId
        }));
       console.log(likeRef.current);
       console.log(`Item ${theId} was clicked`);
       console.log(document.querySelector(`#the${theId}`));
       console.log(document.querySelector(`.abc`));
    }

    const handleRemoveWish = (theId)=>{
        dispatch(cartActions.addToWishlist({
            id:theId
        }));
        console.log(likeRef.current.querySelector(`#${theId}`)); 
    }
    
   
    return(
        <Container maxWidth="xlg" sx={{my:"20px", px:"0"}}>
            <Grid container sx={{px:"0"}} spacing={0.5} justifyContent="space-between">
            { props.articles[1].map((article, id)=>{
                const Image = article.ImageUrl;
                return(<Grid item xs={12} md={3} key={id} >
                        <Box  className="stacked">
                        <img src={Image} style={{width:"100%", height:"100%"}} alt="Shirt-img" className="product_img" onClick={()=>{handleItem(article.description, article.ImageUrl, article.price, article.id, article.name, article.sizes)}}/>
                        <Box className="gridContent">
                        <Box className="sizes" sx={{textAlign:"center"}}>
                        <Typography variant="body2" gutterBottom>Add size</Typography>    
                            {   article.sizes.map((size)=>{
                                    return <Button variant="text" sx={{mb:"20px"}} size="small" onClick={()=>{handleClickSize(article.name, article.price, article.ImageUrl, size, article.id)}}>{size}</Button>
                            })
                            }        
                            
                        </Box>

                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography variant="body2" gutterBottom color="secondary">{article.name}</Typography>

                        { wish ?<Button onClick={()=>{handleAddWish(article.name, article.price, article.ImageUrl, article.id) ; _color="pink"} } ref={likeRef}> <FavoriteBorderIcon /> </Button>:
                        <Button onClick={()=>{handleRemoveWish(article.id);  }}> <FavoriteIcon id={"the"+article.id} ref={likeRef} sx={{color:`${_color}`}} /></Button>
                        }
                        </Box>
                        <Typography variant="body2" gutterBottom color="secondary">US${article.price}</Typography>

                        </Box>
                        </Box>
                   
                </Grid>)})}
            </Grid>
        </Container>
    )


}