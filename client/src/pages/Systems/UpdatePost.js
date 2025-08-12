import React, { memo } from 'react'
import {CreatePost} from '../Systems'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
const UpdatePost = () => {
  const {postAdmin,isCheck} = useSelector(state => state.post);
  const params = useParams();
  const currentPost = postAdmin?.find(item => item.attributesData.hashtag === params.code);
  return (
    <CreatePost dataPostAdmin={currentPost} hashtag = {params?.code} isCheck = {isCheck}/>
  )
}

export default memo(UpdatePost)