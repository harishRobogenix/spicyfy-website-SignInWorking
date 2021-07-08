import React, { useState, useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import scrollSt from '../sass/imports/scroll.module.css'
import firebase from '../firebase'
import initFirebase from '../../config';

initFirebase();
// list of items
const list = [
  { name: 'Italy' },
  { name: 'New York' },
  { name: 'Tokyo' },
  { name: 'Rome' },
  { name: 'Venice' },
  // { name: 'item6' },
  // { name: 'item7' },
  // { name: 'item8' },
  // { name: 'item9' },
  // { name: 'item10' },
  // { name: 'item11' },
  // { name: 'item12' },
  // { name: 'item13' }
];

// One item component
// selected prop will be passed
const MenuItem = ({ text,url, selected, arra }) => {
    

  if(arra.indexOf(text) >= 0){
    return <div
    className={scrollSt.menuitemactive}
    > <img src={url}/>
        {text}
    </div>;
  }
  else if(arra.indexOf(text) < 0){
    return <div
    className={scrollSt.menuitem}
    >
       
            <img src={url} width='40' height="40" style={{
              paddingRight:10
            }}/>
            
        {text}
    </div>;
  }
};

// All items component
// Important! add unique key



const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<|', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '|>', className: 'arrow-next' });

const ScrollApp = (props) => {

    const [selected,setSelect] = useState('All');
    const [arra, setarra] = useState([selected]);
    const [tags, setTags] = useState([]);
    
    let arr = arra;
    const Menu = (tags, selected,arra) =>
  tags.map(el => {
      const { name } = el;
      const { url } = el;

      return <MenuItem text={name} url={ url} key={name} selected={selected} arra={arra}/>;
  });

    const onSelect = (key) =>{
        if(arr.indexOf(key) == -1){
            arr.push(key);
        }
        else if( arr.indexOf(key) > -1){
        const index = arr.indexOf(key);
            arr.splice(index, 1);
        }
        setSelect(key)
        setarra(arr)
        arr = arra;
    }

    useEffect(() => {
      
    const tagsDoc = firebase.firestore().collection('tags');

    tagsDoc.get().then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const tagsData=[]
          querySnapshot.docs.map(doc => {
              const d = doc.data()
              tagsData.push({ name: d.name , url: d.url })
            });
          setTags(tagsData) 
        }
    });
  

    }, [])

  

    const menu = Menu(tags,selected,arra)


    return (
      <div className={scrollSt.App}>
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    );
  
}

export default ScrollApp;