import { useEffect, useState } from 'react';
import { ProductItem } from './ProductItem/ProductItem';
import { Product } from '../../types/types';
import { Button } from '../common/Button/Button';
import './Products.scss';

export const Products = () => {
  const [products, setProducts] = useState<Product[] | [] | any>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tagFilter, setTagFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: Product[] = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.json', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setTagFilter('');
    setPriceFilter('');
    setSubscriptionFilter(false);
    setSearchQuery('');
  };

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };

  useEffect(() => {
    let filtered = products;

    if (tagFilter) {
      filtered = filtered.filter((product: Product) =>
        product.tags.includes(tagFilter)
      );
    }

    if (priceFilter !== '') {
      filtered = filtered.filter((product: Product) => {
        return parseFloat(product.price) <= parseFloat(priceFilter);
      });
    }

    if (subscriptionFilter) {
      filtered = filtered.filter((product: Product) => product.subscription);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((product: Product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredProducts(filtered);
  }, [tagFilter, priceFilter, subscriptionFilter, searchQuery]);

  return (
    <div className="products">
      <div className={`filter-container ${filtersVisible ? 'visible' : 'hidden'}`}>
        <div className="filter-group">
          <label htmlFor="tagFilter" className="filter-label">
            Tags:
          </label>
          <select
            id="tagFilter"
            value={tagFilter}
            onChange={(e) => {
              setTagFilter(e.target.value);
            }}
            className="filter-select"
          >
            <option value="chocolate">Chocolate</option>
            <option value="caramel">Caramel</option>
            <option value="cookie">Cookie</option>
            <option value="sugar">Sugar</option>
            <option value="peanuts">Peanuts</option>
            <option value="">All</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priceFilter" className="filter-label">
            Price:
          </label>
          <input
            type="number"
            id="priceFilter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="subscriptionFilter" className="filter-label">
            Subscription:
          </label>
          <input
            type="checkbox"
            id="subscriptionFilter"
            checked={subscriptionFilter}
            onChange={() => setSubscriptionFilter(!subscriptionFilter)}
            className="filter-checkbox"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="searchQuery" className="filter-label">
            Search:
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>
      <div className="products-block">
        <div className="toggle-filters-button">
          <Button onClick={toggleFiltersVisibility}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        <div className="pagination">
          {pageNumbers.map((pageNumber: number) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
        {currentItems.length ? (
          <ul className="products-list">
            {currentItems.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <div>No products found</div>
        )}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Ann error occured</div>}
      </div>
    </div>
  );
};
