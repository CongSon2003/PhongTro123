import React,{memo} from 'react'
import { useSelector } from 'react-redux'
import { Link , createSearchParams , useNavigate,useLocation, useSearchParams} from 'react-router-dom'
const notActive = 'px-[18px] py-[15px] rounded-md hover:bg-[#ddd] cursor-pointer bg-white'
const active = 'px-[18px] py-[15px] rounded-md hover:text-white hover:bg-secondary2 bg-secondary2 text-white'
const PageNumber = ({number,currentPage,type,icon}) => {
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {posts,count} = useSelector(state => state.post);
  const Location = useLocation();
  let entries = searchParams.entries();
  let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
  const currentPageNow = parseInt(searchParams.get('page')) || 1;
  const append = (entries) =>{
    let params = [];
    searchParams.append('page',parseInt(number))
    for (const entry of entries) {
      params.push(entry)
    }
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => (item === i[0] && item !== 'page'))) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
      }else{
        searchParamsObject = {...searchParamsObject,[i[0]] : [i[1]]}
      }
    });
    return searchParamsObject
  };
  const append_EndPageAndStartPage = (entries,type) =>{
    let params = [];
    type === 'end' ? searchParams.append('page',parseInt(maxPage)) : searchParams.append('page',parseInt(1));
    for (const entry of entries) {
      params.push(entry)
    }
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => (item === i[0] && item !== 'page'))) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
      }else{
        searchParamsObject = {...searchParamsObject,[i[0]] : [i[1]]}
      }
    });

    return searchParamsObject
  }
  const append_NextPageAndAfterPage = (entries,type) =>{
    let params = [];
    type === 'next' ? searchParams.append('page',parseInt(currentPageNow + 1)) : searchParams.append('page',parseInt(currentPageNow - 1));
    for (const entry of entries) {
      params.push(entry)
    }
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => (item === i[0] && item !== 'page'))) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]],i[1]]
      }else{
        searchParamsObject = {...searchParamsObject,[i[0]] : [i[1]]}
      }
    });
    return searchParamsObject
  }

  const handleNextPage = () =>{
    if (!(number === '...')) {
      if (isNaN(parseInt(number))) {
        if (type === 'start') {
          Navigate({
            pathname : Location.pathname,
            search : createSearchParams(append_EndPageAndStartPage(entries,type)).toString()
          })
        } else if (type === 'next') {
          Navigate({
            pathname : Location.pathname,
            search : createSearchParams(append_NextPageAndAfterPage(entries,type)).toString()
          })
        }else if (type === 'after') {
          Navigate({
            pathname : Location.pathname,
            search : createSearchParams(append_NextPageAndAfterPage(entries,type)).toString()
          })
        } else if(type === 'end'){
            Navigate({
              pathname : Location.pathname,
              search : createSearchParams(append_EndPageAndStartPage(entries,type)).toString()
          })
        }
      }else{
        Navigate({
          pathname : Location.pathname,
          search : createSearchParams(append(entries)).toString()
        })
      }
    }
  }
  return (
    <div 
    onClick={() => handleNextPage()}
    className={parseInt(number) === parseInt(currentPage) ? active : `${notActive} ${number === '...' ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {number}
    </div>
  )
}

export default memo(PageNumber)