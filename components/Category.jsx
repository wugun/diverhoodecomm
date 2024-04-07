import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input } from './';

function Category({ handleChange }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Initialize filter value based on URL query parameter when component mounts
  useEffect(() => {
    const { query } = router;
    const category = query.category || ''; // Get category query parameter from URL
    setSelectedCategory(category);
  }, [router]);

  // Update filter value when URL query parameter changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      const { query } = router;
      const category = query.category || ''; // Get category query parameter from URL
      setSelectedCategory(category);
    };

    // Listen for changes in the URL query parameters
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div className="text-sm">
        <Input
          handleChange={handleChange}
          value="Any"
          title="Any"
          name="test"
          checked={!selectedCategory} // Check if no category is selected
        />
        <Input
          handleChange={handleChange}
          value="Rug"
          title="Rug"
          name="test"
          checked={selectedCategory === 'Rug'} // Check if category is 'Rug'
        />
        <Input
          handleChange={handleChange}
          value="Sofa"
          title="Sofa"
          name="test"
          checked={selectedCategory === 'Sofa'} // Check if category is 'Sofa'
        />
        <Input
          handleChange={handleChange}
          value="Home Decor"
          title="Home Decor"
          name="test"
          checked={selectedCategory === 'Home Decor'} // Check if category is 'Home Decor'
        />
      </div>
    </div>
  );
}

export default Category;