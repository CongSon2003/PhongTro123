import React, { useEffect, useState } from 'react'
import ListContent from './ListContent'
import Pagination from './Pagination'
import { ItemAtList, ItemSideBar, RelatedBox } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { apiGetPosts } from '../../services'
const LovePost = () => {
    const {idPost} = useSelector(state => state.lovepost);
    const {postsAll} = useSelector(state => state?.post);
    const [lovePost,SetlovePost] = useState([]); 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actions.getPosts())
    },[])
    // cl
    useEffect(() => {
        if (postsAll && idPost) {
            for (let index = 0; index < idPost.length; index++) {
                const element = idPost[index];
                for (const key in postsAll) {
                    if (postsAll[key].id === element) {
                        let data = postsAll[key];
                        lovePost.every(item => item.id !== data.id) && SetlovePost(prev => [...prev,data])
                    }
                }
            }
        }
    },[idPost,postsAll])
  return (
    <div className='w-full flex flex-col gap-3'>
        <div>
            <h1 className='text-[1.8rem] mt-3 font-semibold'>Tin đăng đã lưu</h1>
        </div>
        <div className='w-full flex gap-4'>
            <div className='left w-[70%]'>
                <div className='flex flex-col gap-[1px]'>
                    {lovePost.length > 0 && lovePost.map(item => {
                            return (
                                <ItemAtList 
                                    title={item?.title} 
                                    key={item?.id} 
                                    address={item?.address} 
                                    attributes = {item?.attributesData}
                                    description = {item?.description}
                                    images={JSON.parse(item?.imagesData.images)}
                                    star = {+item?.star}
                                    user = {item?.userData}
                                    id = {item?.id}
                                    isLovePost={true}
                                />
                            )
                    })}
                </div>
            </div>
            <div className='right w-[30%] gap-5 flex flex-col items-center justify-start'>
                <RelatedBox isnewPost={true}/>
                <RelatedBox isnewPost={false}/>
            </div>
        </div>
      </div>
  )
}

export default LovePost