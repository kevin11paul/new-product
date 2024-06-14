import React from "react";
import {LegacyCard, LegacyTabs, Pagination} from '@shopify/polaris';
import {useState, useCallback} from 'react';
 
import DataTableFiltersExample from './search'

export default function TabsExample() {
    const [selected, setSelected] = useState(0);
  
    const handleTabChange = useCallback(
      (selectedTabIndex: number) => setSelected(selectedTabIndex),
      [],
    );
  
    const tabs = [
      {
        id: 'all-customers-1',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content-1',
      },
      {
        id: 'accepts-marketing-1',
        content: 'Active',
        panelID: 'accepts-marketing-content-1',
      },
      {
        id: 'repeat-customers-1',
        content: 'Draft',
        panelID: 'repeat-customers-content-1',
      },
      {
        id: 'prospects-1',
        content: 'Archieved',
        panelID: 'prospects-content-1',
      },
    ];
  
    return (
      <LegacyCard>
        <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        
          <DataTableFiltersExample/>
         
      
        </LegacyTabs>
      </LegacyCard>
    );
  }