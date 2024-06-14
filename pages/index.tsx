import Head from "next/head";
import DataTableFiltersExample from './search';
import Heady  from "./head";
import Image from "next/image";
import ModalExample from './modal';
import TabsExample from './tabs';
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
 
import {AppProvider, Page, Layout, LegacyCard, Button,Frame, Loading} from '@shopify/polaris';
import {useState, useCallback,useEffect} from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <AppProvider i18n={enTranslations}>
    <Page halfWidth>
    <div style={{height: '100px'}}>
    <Frame>
    <Loading />       
    <Layout>
        <Layout.Section>
          <div>
          <Heady/>
          </div>
          <div>
        <TabsExample/> 
        </div>
     </Layout.Section>
     </Layout>
     </Frame>
     </div>
     </Page>
    
    </AppProvider>
  );
}
