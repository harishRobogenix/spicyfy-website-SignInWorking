import React, { useState, useEffect } from 'react';
import _, { rest } from 'lodash';
import Image from 'next/image'
import { Layout } from '../components';
import { Link, getPageUrl, withPrefix } from '../utils';
import BlogPostFooter from '../components/BlogPostFooter';
import Taglist from '../components/Taglist';
import firebase from '../firebase'
import initFirebase from '../../config';
import cardStyles from "../sass/imports/card.module.css"
import SearchStyles from "../sass/imports/scroll.module.css";

const Blog = props => {
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [searchedData, setSearchedData] = useState('');
    
   useEffect(() => {
    const businessTypes = firebase.firestore().collection('businesses');

    businessTypes.get().then(querySnapshot => {
      if (querySnapshot.size > 0) {
        const businessTypesDocs = querySnapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name,
            addressLine1: d.addressLine1,
            addressLine2: d.addressLine2,
            city: d.city,
            state: d.state,
            country: d.country,
            isVegan: d.isVegan,
            isVegetarian: d.isVegetarian,
            photo: d.photo,
            priceRating: d.priceRating,
            products: d.products,
              place: d.place,
            imageUrl:d.frontImage
          };
        });
        if (!searchedData) setRestaurantImages(businessTypesDocs);
      }
    });
  }, [searchedData]);


  const handleSearch = text => {
    const filteredData = [];
      if (restaurantImages.length) {
          restaurantImages.map(data => {
              if (
                  data?.products.find(element =>
                      element.name.includes(text),
                  ) ||
                  data.name.includes(text)
              )
                  filteredData.push(data);
          });
    
      }
        if (filteredData.length) setRestaurantImages(filteredData);
    // else setBusinessAvailable([]);
    setSearchedData(text);
  
  }

    const textField = () => {
        return(
        // <div>
        // <input
        //     type="text"
        //         value={searchedData}
        //      onChange={queryText => {
        //     console.log(queryText);
        //   }}
        //     />
        //     </div>
            <div className={SearchStyles.searchbar}>
            <form>
                <label>
                <input type="text" className={SearchStyles.input}  onChange={(e) => {
                    handleSearch(e)
                }}/>

                </label>
                
            </form>
        </div>
        )
    }
    const renderPost=(post, index, data) => {
        const title = _.get(post, 'title');
        const thumbImage = _.get(post, 'thumb_image');
        const thumbImageAlt = _.get(post, 'thumb_image_alt');
        const excerpt = _.get(post, 'excerpt');
        const postUrl = getPageUrl(post, { withPrefix: true });

        return (
            <>
            
            <article key={index} className="cell post">

                <div className="card">
                    {thumbImage && (
                        <Link className="post-thumbnail" href={postUrl}>
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </Link>
                    )}
                    <div className="post-body">
                        <header className="post-header">
                            <h2 className="post-title">
                                <Link href={postUrl}>{title}</Link>
                            </h2>
                        </header>
                        {/* {excerpt && (
                            <div className="post-excerpt">
                                <p>{excerpt}</p>
                            </div>
                        )}
                        <BlogPostFooter post={post} dateType={'short'} data={data} /> */}
                    </div>
                </div>
                </article>
                </>
        );
    }

    const page = _.get(props, 'page');
        const data = _.get(props, 'data');
        const config = _.get(props, 'data.config');
        const posts = _.orderBy(_.get(props, 'posts', []), 'date', 'desc');


        return (
            <>
            
                <Layout page={page} config={config}>
                    
                    <div className="outer">
                        
                        <div className="inner">
                          
                            <Taglist/>
                            
                            {textField()}
                           

                <div  className={cardStyles.container}>
             
                {restaurantImages.map(dat =>{
                    return (
                        <div className={cardStyles.card} >
                        <div className={cardStyles.image}>
                        <Image src={dat.imageUrl}  width={300}
                        height={400}/>
                        </div>
                        <div className={cardStyles.overlay}>
                            <div className={cardStyles.upperinfo}>
                                <h3>{dat.name}</h3>
                                
                            </div>
                        </div>
                    </div>
                        
                   
                    )
                })}    
            </div>
                    </div>
                </div>
                </Layout>
                </>
                )
      
    
}

export default Blog
