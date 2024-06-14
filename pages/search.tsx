import React, { useState, useEffect } from 'react';
import { Button,Pagination,LegacyCard, LegacyFilters, DataTable, ChoiceList, TextField } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';


function DataTableFiltersExample() {
  const [availability, setAvailability] = useState<string[] | undefined>(undefined);
  const [productType, setProductType] = useState<string[] | undefined>(undefined);
  const [taggedWith, setTaggedWith] = useState<string | undefined>(undefined);
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<any[]>([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAvailabilityChange = (value: string[]) => setAvailability(value);
  const handleProductTypeChange = (value: string[]) => setProductType(value);
  const handleTaggedWithChange = (value: string) => setTaggedWith(value);
  const handleFiltersQueryChange = (value: string) => setQueryValue(value);
  const handleAvailabilityRemove = () => setAvailability(undefined);
  const handleProductTypeRemove = () => setProductType(undefined);
  const handleTaggedWithRemove = () => setTaggedWith(undefined);
  const handleQueryValueRemove = () => setQueryValue(undefined);
  const handleFiltersClearAll = () => {
    handleAvailabilityRemove();
    handleProductTypeRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  };

  const filters = [
    {
      key: 'availability',
      label: 'Availability',
      filter: (
        <ChoiceList
          title="Availability"
          titleHidden
          choices={[
            {label: 'Online Store', value: 'Online Store'},
            {label: 'Point of Sale', value: 'Point of Sale'},
            {label: 'Buy Button', value: 'Buy Button'},
          ]}
          selected={availability || []}
          onChange={handleAvailabilityChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'productType',
      label: 'Product type',
      filter: (
        <ChoiceList
          title="Product type"
          titleHidden
          choices={[
            {label: "Men's Clothing", value: "men's clothing"},
            {label: 'Jewelry', value: 'jewelery'},
            {label: "Women's Clothing", value: "women's clothing"},
            {label: 'Electronics', value: 'electronics'},
          ]}
          selected={productType || []}
          onChange={handleProductTypeChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'vendor',
      label: 'Vendor',
      filter: (
        <ChoiceList
          title="Vendor"
          titleHidden
          choices={[
            {label: 'M-Wear', value: 'm-wear'},
            {label: 'GD-Company', value: 'gd-company'},
            {label: 'W-Wear', value: 'w-wear'},
            {label: 'E-Store', value: 'e-store'},
          ]}
          selected={taggedWith || []}
          onChange={handleTaggedWithChange}
          allowMultiple
        />
      ),
    },
  ];
  
  const appliedFilters = [];
  if (availability && !isEmpty(availability)) {
    const key = 'availability';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, availability),
      onRemove: handleAvailabilityRemove,
    });
  }
  if (productType && !isEmpty(productType)) {
    const key = 'productType';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, productType),
      onRemove: handleProductTypeRemove,
    });
  }
  if (taggedWith && !isEmpty(taggedWith)) {
    appliedFilters.push({
      key: 'taggedWith',
      label: `Tagged with ${taggedWith}`,
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <div style={{height: 'auto'}}>
      <LegacyCard>
        <LegacyCard.Section>
          <LegacyFilters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleFiltersClearAll}
          />
         
        </LegacyCard.Section>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
          ]}
          headings={[
            ' ',
            'Product',
            'Type',
            'Vendor',
          ]}
          
          rows={products
            .filter(product =>
              product.title.toLowerCase().includes(queryValue ? queryValue.toLowerCase() : '')
            )
            .map((product) => [
              <img src={product.image} alt={product.title} style={{ width: '50px', height: 'auto' }} />,
              product.title,
              product.category === "men's clothing" || product.category === "jewelery" || product.category === "women's clothing" ? 'outdoor' : 'indoor',
              getProductVendor(product),
          ])}
          totals={['', '', '', '']}
        />
           <Pagination
        onPrevious={() => {
          console.log('Previous');
        }}
        onNext={() => {
          console.log('Next');
        }}
        type="table"
        hasNext
        />
          
      </LegacyCard>
    </div>
  );

  function disambiguateLabel(key: string, value: string[]): string {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'availability':
        return value.map((val) => `Available on ${val}`).join(', ');
      case 'productType':
        return value.join(', ');
      default:
        return value.toString();
    }
  }

  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }

  function getProductVendor(product: any): string {
    switch (product.category) {
      case "men's clothing":
        return 'm-wear';
      case 'jewelery':
        return 'gd-company';
      case "women's clothing":
        return 'w-wear';
      case 'electronics':
        return 'e-store';
      default:
        return '';
    }
  }
}

export default DataTableFiltersExample;
 