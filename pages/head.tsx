//'use client';
import Image from "next/image";
import enTranslations from '@shopify/polaris/locales/en.json';
 
import styles from "@/styles/heado.module.css";
 import React from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {AppProvider, Page, LegacyCard, Button, Card, Tag,Tabs,Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import ReactDOM from "react-dom/client";

function PopoverWithActionListExample() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button  onClick={togglePopoverActive}  disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '5px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="more options"
          items={[{content: 'option A'}, {content: 'option B'}]}
        />
      </Popover>
    </div>
  );
}

export default function Heady() {
  return (
    <AppProvider i18n={enTranslations}>
     <Page title ="Products" >
       
        <div  >
       <ul class={styles.navtabsul}>

       <li class={styles.navtabsli}>
            <button class={styles.button2} variant="primary" >Add Product</button>
          </li>

          <li class={styles.navtabsli}>
          <PopoverWithActionListExample/>
          
          </li>
          <li class={styles.navtabsli}>
            <button class={styles.button1} variant="tertiary" > Import</button> 
          </li>

          <li class={styles.navtabsli}>
            <button class={styles.button1} variant="plain">Export</button> 
          </li>
          
        

         
         
       </ul>
       </div>
     </Page>
  
 </AppProvider>

  );

}
  
 