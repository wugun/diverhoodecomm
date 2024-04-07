import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from './';
import ReactPaginate from 'react-paginate';

const Showcase = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
  
    const RenderCards = ({ data, title }) => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = data?.slice(startIndex, endIndex);
    
      if (currentItems?.length > 0) {
        return currentItems.map((post) => <Card key={post._id} {...post} />);
      }
      return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
      );
    };
    
    const fetchPosts = async () => {
      setLoading(true);
  
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
          console.log(allPosts);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResult);
        }, 500),
      );
    };

    function handlePageClick(selectedPage) {
      setCurrentPage(selectedPage.selected);
    }

    return (
      <section className="max-w-7xl mx-auto">
  
        <div className="mt-16">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
  
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing Results for <span className="text-[#222328]">{searchText}</span>:
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No Search Results Found"
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="No Posts Yet"
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="mt-4">
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil((searchText ? searchedResults?.length : allPosts?.length) / itemsPerPage)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          activeClassName="active"
          />
        </div>

      </section>
    );
};

export default Showcase;